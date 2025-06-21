import {useRef, useEffect, useState} from 'react';

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

export default function Settings({themes,selectedTheme,handleTheme}) {

    const ambients = ["Lines","Shapes","Bouncing","Lightning"];
    const panels = ["Local","Profile","Ambience","Links","Line Chart","Pie Chart","Bar Chart","Sum","Average","Median","Calculator","Log"];
    const tools = ["Line Chart","Pie Chart","Bar Chart","Sum","Average","Median"];

    const [ambient,setAmbient] = useState('');
    const [leftbarVals,setLeftbarVals] = useState([]);
    const [rightbarVals,setRightbarVals] = useState([]);
    const [toolbarVals,setToolbarVals] = useState([]);
    const [refVals,setRefVals] = useState([]);
    const [datasets, setDatasets] = useState([]);
    const formRef = useRef();

    const clearSettings = () => {
        localStorage.setItem('current_dataset',"");
        localStorage.setItem('theme',"");
    }

    const update = async () => {
        const form = formRef.current;
        const ref_links = [...refVals];
        const leftbar_panels = [...leftbarVals];
        const rightbar_panels = [...rightbarVals];
        const toolbar_tools = [...toolbarVals];
        const body = {
          theme: form.theme.value,
          default_dataset: form.default_dataset.value,
          ambient: form.ambient.value,
          ref_links: ref_links,
          leftbar_panels: leftbar_panels,
          rightbar_panels: rightbar_panels,
          toolbar_tools: toolbar_tools
        };
        const res = await fetch('/api/savesettings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const result = await res.json();
    };

    const handleAmbient = (event) => {
        setAmbient(event.target.value);
    }

    const handleCheckboxChange = (value, stateArray, setStateArray) => {
        return (e) => {
        if (e.target.checked) {
            setStateArray([...stateArray, value]);
        } else {
            setStateArray(stateArray.filter(v => v !== value));
        }
        };
    };

    const handleRefChange = (i,event) => {
        let data = [...refVals];
        data[i] = event.target.value;
        setRefVals(data);
    };

    const addRefLink = () => {
        let newlink = '';
        setRefVals([...refVals, newlink]);
    }

    const fetchData = async () => {
        const s_res = await fetch('/api/getsettings');
        const data = await s_res.json();
        const d_res = await fetch('/api/getdatasets');
        const datasets = await d_res.json();
        setDatasets(datasets);
        setAmbient(data.visual_panel || '');
        setRefVals(data.reference_links);
        setLeftbarVals(data.left_bar_panels);
        setRightbarVals(data.right_bar_panels);
        setToolbarVals(data.toolbar_tools);
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <div className="bg-gray-100 text-gray-600 p-2 mt-4 rounded">
        <form ref={formRef}>
            <div className="p-4">
                Theme<br />
                <select name="theme" value={selectedTheme} className={inputClass} onChange={handleTheme} >
                    {themes.map((val,i) => (
                        <option key={`theme_${i}`} value={val}>{val}</option>
                    ))}
                </select>
            </div>

            <div className="p-4">
                Default Dataset<br />
                <select name="default_dataset" className={inputClass}>
                <option value=''>- None -</option>
                {datasets.map((val,i) => (
                    <option key={`ds_${i}`} value={val.id}>{val.name}</option>
                ))}
                </select>
            </div>

            <div className="p-4">
                Ambient Panel<br />
                <select name="ambient" value={ambient} onChange={handleAmbient} className={inputClass}>
                {ambients.map((val,i) => (
                    <option key={`ambient_${i}`} value={val}>{val}</option>
                ))}
                </select>
            </div>

            <div className="p-4">
                Reference Links<br />
                {refVals.map((val,i) => {
                    return (
                        <input type="text" className={inputClass} value={val} key={`ref_${i}`} onChange={event => handleRefChange(i, event)} />
                    );
                })}
                <button onClick={addRefLink} type="button" className="btn mt-4">Add Link</button>
            </div>

            <div className="p-4">
                Left Bar Panels<br />
                <div className="flex flex-wrap gap-2 p-4">
                {panels.map((val,i) => (
                    <div key={`left_${i}`} className="min-w-[200px]">
                    <input type="checkbox" id={`left_${i}`} value={val} checked={leftbarVals.includes(val)} onChange={handleCheckboxChange(val,leftbarVals,setLeftbarVals)} />
                    <label htmlFor={`left_${i}`} >{val}</label>
                    </div>
                ))}
                </div>
            </div>

            <div className="p-4">
                Right Bar Panels<br />
                <div className="flex flex-wrap gap-2 p-4">
                {panels.map((val,i) => (
                    <div key={`right_${i}`} className="min-w-[200px]">
<input type="checkbox" id={`right_${i}`} value={val} checked={rightbarVals.includes(val)} onChange={handleCheckboxChange(val,rightbarVals,setRightbarVals)} />
                    <label htmlFor={`right_${i}`} >{val}</label>
                    </div>
                ))}
                </div>
            </div>

            <div className="p-4">
                Toolbar Tools<br />
                <div className="flex flex-wrap gap-2 p-4">
                {tools.map((val,i) => (
                    <div key={`tool_${i}`} className="min-w-[200px]">
                    <input type="checkbox" id={`tool_${i}`} value={val} checked={toolbarVals.includes(val)} onChange={handleCheckboxChange(val,toolbarVals,setToolbarVals)} /> 
                    <label htmlFor={`tool_${i}`} >{val}</label>
                    </div>
                ))}
                </div>
            </div>
            <div className="p-4">
                <button onClick={update} type="button" className="btn btn-info mt-4">Save</button>
            </div>
            <div className="p-4">
                <button onClick={clearSettings} type="button" className="btn btn-warning mt-4">Clear Storage</button>
            </div>
        </form>
        </div>
    );
}

