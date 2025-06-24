import {useEffect, useState} from 'react';
import SidebarPanel from "@/components/SidebarPanel"
import LineChartPanel from "@/components/LineChartPanel"
import PieChartPanel from "@/components/PieChartPanel"
import BarChartPanel from "@/components/BarChartPanel"
import SumPanel from "@/components/SumPanel"
import AvgPanel from "@/components/AvgPanel"
import MedianPanel from "@/components/MedianPanel"
import Calculator from "@/components/Calculator"
import LogPanel from "@/components/LogPanel"

export default function RightSidebar({data,lineChartCols,pieChartCols,barChartCols,sumCols,avgCols,medianCols}) {

    // for reference
    //const panels = ["Local","Profile","Ambience","Links","Line Chart","Pie Chart","Bar Chart","Sum","Average","Median","Calculator","Log"];
    const [rightbarPanels,setRightbarPanels] = useState([]);
    const fetchData = async () => {
        const s_res = await fetch('/api/getsettings');
        const data = await s_res.json();
        setRightbarPanels(data.right_bar_panels);
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <>
            {rightbarPanels.includes("Line Chart") &&
                <SidebarPanel> <LineChartPanel data={data} columns={lineChartCols} /> </SidebarPanel>
            }
            {rightbarPanels.includes("Pie Chart") &&
                <SidebarPanel> <PieChartPanel data={data} pieChartCols={pieChartCols} /> </SidebarPanel>
            }
            {rightbarPanels.includes("Bar Chart") &&
                <SidebarPanel> <BarChartPanel data={data} barChartCols={barChartCols} /> </SidebarPanel>
            }
            {rightbarPanels.includes("Sum") &&
                <SidebarPanel> <SumPanel data={data} sumCols={sumCols} /> </SidebarPanel>
            }
            {rightbarPanels.includes("Average") &&
                <SidebarPanel> <AvgPanel data={data} avgCols={avgCols} /> </SidebarPanel>
            }
            {rightbarPanels.includes("Median") &&
                <SidebarPanel> <MedianPanel data={data} medianCols={medianCols} /> </SidebarPanel>
            }
            {rightbarPanels.includes("Calculator") &&
                <Calculator />
            }
            {rightbarPanels.includes("Log") &&
                <SidebarPanel> <LogPanel /> </SidebarPanel>
            }
        </>
    );
}
