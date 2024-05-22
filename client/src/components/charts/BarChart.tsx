'use client';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip} from 'recharts';

const data =[
  {name: 'Sun', rides: 4000}, {name: 'Mon', rides: 3000}, {name: 'Tue', rides: 2000},
  {name: 'Wed', rides: 2780}, {name: 'Thur', rides: 1890}, {name: 'Fri', rides: 2390}, {name: 'Sat', rides: 2590}
]

const BarChartComponent =() =>{
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