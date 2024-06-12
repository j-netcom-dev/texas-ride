'use client';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip} from 'recharts';


const BarChartComponent =({data}: {data: any}) =>{
  return (<ResponsiveContainer height='100%' width='100%'>
     <BarChart width={500} height={300} data={data} margin={{right: 30}}>
    <YAxis />
    <XAxis dataKey='name' />
    <CartesianGrid strokeDasharray='5 5'/>
    <Tooltip />
    <Bar dataKey={'rides'} type={'monotone'} fill='#8b5cf6' stroke='#7c3aed'/>
  </BarChart>
  </ResponsiveContainer>)
}

export default BarChartComponent;