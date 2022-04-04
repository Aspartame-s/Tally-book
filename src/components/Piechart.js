import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";

const PieCharts = ({ pieChartData, title }) => {
  if(pieChartData.length === 0) {
    return <h3 className="text-center mt-3">{title}还没有任何数据</h3>
  }
  return (
    <div className="pie-chart-component">
      <h3 className="text-center mt-3">{title}</h3>
      <ResponsiveContainer width={'100%'} height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={pieChartData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}


export default PieCharts