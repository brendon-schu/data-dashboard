
import ColumnSelector from "@/components/ColumnSelector"

export default function ToolbarPanel({
  activePanel,
  data,
  visibleCols,
  lineChartCols,
  toggleLineChartCol,
  pieChartCols,
  togglePieChartCol,
  barChartCols,
  toggleBarChartCol,
  sumCols,
  toggleSumCol,
  avgCols,
  toggleAvgCol,
  medianCols,
  toggleMedianCol,
  toggleColumn
}) {
  return (
    <div className="border border-primary bg-base-300 text-base-content p-2 rounded shadow-xl">
      {activePanel === "dashboard" && (
        <>
          <ColumnSelector name="Columns" columns={data.length > 0 ? Object.keys(data[0]) : []} visible={visibleCols} toggle={toggleColumn} />
          <ColumnSelector name="Line Chart" columns={visibleCols} visible={lineChartCols} toggle={toggleLineChartCol} />
          <ColumnSelector name="Pie Chart" columns={visibleCols} visible={pieChartCols} toggle={togglePieChartCol} />
          <ColumnSelector name="Bar Chart" columns={visibleCols} visible={barChartCols} toggle={toggleBarChartCol} />
          <ColumnSelector name="Sum" columns={visibleCols} visible={sumCols} toggle={toggleSumCol} />
          <ColumnSelector name="Avg" columns={visibleCols} visible={avgCols} toggle={toggleAvgCol} />
          <ColumnSelector name="Median" columns={visibleCols} visible={medianCols} toggle={toggleMedianCol} />
        </>
      )}

      {activePanel === "data" && <h4 className="text-lg font-bold">Data</h4>}
      {activePanel === "profile" && <h4 className="text-lg font-bold">Profile</h4>}
      {activePanel === "settings" && <h4 className="text-lg font-bold">Settings</h4>}
      {activePanel === "log" && <h4 className="text-lg font-bold">Log</h4>}
    </div>
  );
}

