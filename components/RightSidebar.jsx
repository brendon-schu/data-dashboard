
import SidebarPanel from "@/components/SidebarPanel"
import LineChartPanel from "@/components/LineChartPanel"
import PieChartPanel from "@/components/PieChartPanel"
import BarChartPanel from "@/components/BarChartPanel"
import SumPanel from "@/components/SumPanel"
import AvgPanel from "@/components/AvgPanel"
import MedianPanel from "@/components/MedianPanel"
import Calculator from "@/components/Calculator"

export default function RightSidebar({data,lineChartCols,pieChartCols,barChartCols,sumCols,avgCols,medianCols}) {
    return (
        <>
            <SidebarPanel>
                <LineChartPanel data={data} columns={lineChartCols} />
            </SidebarPanel>
            <SidebarPanel>
                <PieChartPanel data={data} pieChartCols={pieChartCols} />
            </SidebarPanel>
            <SidebarPanel>
                <BarChartPanel data={data} barChartCols={barChartCols} />
            </SidebarPanel>
            <SidebarPanel>
                <SumPanel data={data} sumCols={sumCols} />
            </SidebarPanel>
            <SidebarPanel>
                <AvgPanel data={data} avgCols={avgCols} />
            </SidebarPanel>
            <SidebarPanel>
                <MedianPanel data={data} medianCols={medianCols} />
            </SidebarPanel>
            <Calculator />
            <SidebarPanel>
            Log
            </SidebarPanel>
        </>
    );
}
