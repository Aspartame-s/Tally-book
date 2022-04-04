import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { Colors } from '../utility';

const ColorsArr = Object.keys(Colors).map(key => Colors[key])

const PieCharts = ({ pieChartData, title }) => {
  if (pieChartData.length === 0) {
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
            cx='50%' 
            cy='50%'
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {
              pieChartData.map((entry, index) => <Cell key={index} fill={ColorsArr[index % ColorsArr.length]} />)
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}


export default PieCharts