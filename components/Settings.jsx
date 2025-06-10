
import {useRef, useEffect, useState} from 'react';

const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

export default function Settings({themes}) {

    const ambients = ["Lines","Shapes","Bouncing","Lightning"];
    const panels = ["Local","Profile","Ambience","Links","Line Chart","Pie Chart","Bar Chart","Sum","Average","Median","Calculator","Log"];
    const tools = ["Line Chart","Pie Chart","Bar Chart","Sum","Average","Median"];

    const [theme,setTheme] = useState('');
    const handleTheme = (event) => {
        setTheme(event.target.value);
    }

    const [ambient,setAmbient] = useState('');
    const handleAmbient = (event) => {
        setAmbient(event.target.value);
    }

    const formRef = useRef();
    const update = async () => {
        const form = formRef.current;
        const ref_links = [...refVals];
        const leftbar_panels = [...leftBarVals];
        const rightbar_panels = [...rightBarVals];
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

    const [leftBarVals,setLeftBarVals] = useState([]);
    const handleLeftChange = (i,event) => {
        const newVals = [];
        for (let i=0; i<panels.length; i++) {
            if (document.getElementById("left_"+i).checked) {
                newVals.push(document.getElementById("left_"+i).value);
            }
        }
        setLeftBarVals(newVals);
    };
    const [rightBarVals,setRightBarVals] = useState([]);
    const handleRightChange = (i,event) => {
        const newVals = [];
        for (let i=0; i<panels.length; i++) {
            if (document.getElementById("right_"+i).checked) {
                newVals.push(document.getElementById("right_"+i).value);
            }
        }
        setRightBarVals(newVals);
    };

    const [toolbarVals,setToolbarVals] = useState([]);
    const handleToolbarChange = (i,event) => {
        const newVals = [];
        for (let i=0; i<tools.length; i++) {
            if (document.getElementById("tool_"+i).checked) {
                newVals.push(document.getElementById("tool_"+i).value);
            }
        }
        setToolbarVals(newVals);
    };

    const [refVals,setRefVals] = useState([]);
    const handleRefChange = (i,event) => {
        let data = [...refVals];
        data[i] = event.target.value;
        setRefVals(data);
    };
    const addRefLink = () => {
        let newlink = '';
        setRefVals([...refVals, newlink]);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/getsettings');
            const data = await res.json();
            setTheme(data.theme || '');
            setAmbient(data.visual_panel || '');
            setRefVals(data.reference_links);
            setLeftBarVals(data.left_bar_panels);
            setRightBarVals(data.right_bar_panels);
            setToolbarVals(data.toolbar_tools);
        };
        fetchData();
    }, []);

    useEffect(() => {
        for (let i=0; i<panels.length; i++) {
            if ([...leftBarVals].includes(panels[i])) {
                document.getElementById("left_"+i).checked = true;
            }
        }
        for (let i=0; i<panels.length; i++) {
            if ([...rightBarVals].includes(panels[i])) {
                document.getElementById("right_"+i).checked = true;
            }
        }
        for (let i=0; i<tools.length; i++) {
            if ([...toolbarVals].includes(tools[i])) {
                document.getElementById("tool_"+i).checked = true;
            }
        }
    },[leftBarVals,rightBarVals,toolbarVals]);

    return (
        <div className="bg-gray-100 text-gray-600 p-2 mt-4 rounded">
        <form ref={formRef}>
            <div className="p-4">
                Theme<br />
                <select name="theme" value={theme} className={inputClass} onChange={handleTheme} >
                    {themes.map((val,i) => (
                        <option key={`theme_${i}`} value={val}>{val}</option>
                    ))}
                </select>
            </div>

            <div className="p-4">
                Default Dataset<br />
                <select name="default_dataset" className={inputClass}>
                <option value=''>List of Sets</option>
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
                    <input type="checkbox" id={`left_${i}`} value={val} onChange={event => handleLeftChange(i,event)} /> <label htmlFor={`left_${i}`} >{val}</label>
                    </div>
                ))}
                </div>
            </div>

            <div className="p-4">
                Right Bar Panels<br />
                <div className="flex flex-wrap gap-2 p-4">
                {panels.map((val,i) => (
                    <div key={`right_${i}`} className="min-w-[200px]">
                    <input type="checkbox" id={`right_${i}`} value={val} onChange={event => handleRightChange(i,event)} /> <label htmlFor={`right_${i}`} >{val}</label>
                    </div>
                ))}
                </div>
            </div>

            <div className="p-4">
                Toolbar Tools<br />
                <div className="flex flex-wrap gap-2 p-4">
                {tools.map((val,i) => (
                    <div key={`tool_${i}`} className="min-w-[200px]">
                    <input type="checkbox" id={`tool_${i}`} value={val} onChange={event => handleToolbarChange(i,event)} /> <label htmlFor={`tool_${i}`} >{val}</label>
                    </div>
                ))}
                </div>
            </div>
            <div className="p-4">
                <button onClick={update} type="button" className="btn btn-info mt-4">Save</button>
            </div>
        </form>
        </div>
    );
}

