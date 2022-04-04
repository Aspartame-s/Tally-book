import React from 'react'
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const PieCharts = ({ pieChartData }) => {
  return (
    <PieChart width={1000} height={400}>
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
  )
}


export default PieCharts