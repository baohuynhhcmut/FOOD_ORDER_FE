import AreaChartView from "@/components/Chart/AreaChartView"

const ChartOverview = () => {
  return (
    <div className="max-w-7xl">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
            <AreaChartView />
            <AreaChartView />
            <AreaChartView />
            <AreaChartView />
        </div>
    </div>
  )
}
export default ChartOverview