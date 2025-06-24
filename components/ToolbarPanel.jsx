import {useEffect, useState} from 'react';
import ColumnSelector from "@/components/ColumnSelector"

export default function ToolbarPanel({ activePanel, data, visibleCols, lineChartCols, toggleLineChartCol, pieChartCols, togglePieChartCol, barChartCols, toggleBarChartCol, sumCols, toggleSumCol, avgCols, toggleAvgCol, medianCols, toggleMedianCol, toggleColumn }) { 

    // for reference
    //const panels = ["Local","Profile","Ambience","Links","Line Chart","Pie Chart","Bar Chart","Sum","Average","Median","Calculator","Log"];
    const [toolbarPanels,setToolbarPanels] = useState([]);
    const fetchData = async () => {
        const s_res = await fetch('/api/getsettings');
        const data = await s_res.json();
        setToolbarPanels(data.toolbar_tools);
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div className="border border-primary bg-base-300 text-base-content p-2 rounded shadow-xl">
        {activePanel === "dashboard" && (
            <>
            {toolbarPanels.includes("Columns") && 
            <ColumnSelector name="Columns" columns={data.length > 0 ? Object.keys(data[0]) : []} visible={visibleCols} toggle={toggleColumn} />
            }
            {toolbarPanels.includes("Line Chart") && 
            <ColumnSelector name="Line Chart" columns={visibleCols} visible={lineChartCols} toggle={toggleLineChartCol} />
            }
            {toolbarPanels.includes("Pie Chart") && 
            <ColumnSelector name="Pie Chart" columns={visibleCols} visible={pieChartCols} toggle={togglePieChartCol} />
            }
            {toolbarPanels.includes("Bar Chart") && 
            <ColumnSelector name="Bar Chart" columns={visibleCols} visible={barChartCols} toggle={toggleBarChartCol} />
            }
            {toolbarPanels.includes("Sum") && 
            <ColumnSelector name="Sum" columns={visibleCols} visible={sumCols} toggle={toggleSumCol} />
            }
            {toolbarPanels.includes("Average") && 
            <ColumnSelector name="Avg" columns={visibleCols} visible={avgCols} toggle={toggleAvgCol} />
            }
            {toolbarPanels.includes("Median") && 
            <ColumnSelector name="Median" columns={visibleCols} visible={medianCols} toggle={toggleMedianCol} />
            }
            </>
        )}
        {activePanel === "data" && <h4 className="text-lg font-bold">Data Manager</h4>}
        {activePanel === "profile" && <h4 className="text-lg font-bold">Profile</h4>}
        {activePanel === "settings" && <h4 className="text-lg font-bold">Settings</h4>}
        {activePanel === "log" && <h4 className="text-lg font-bold">Audit Log</h4>}
        </div>
    );
}

