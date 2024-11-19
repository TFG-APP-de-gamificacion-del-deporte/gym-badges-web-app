"use client";

import { ApiKey } from "@/config/API"
import styles from "./chart-card.module.scss"
import { FaPlus } from "react-icons/fa6";
import { Area, AreaChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PureComponent } from "react";
import { Props } from "recharts/types/component/LabelList";

const data = [
  {
    date: new Date(2024, 8, 27),
    value: 92,
  },
  {
    date: new Date(2024, 9, 4),
    value: 90.5,
  },
  {
    date: new Date(2024, 9, 11),
    value: 91.3,
  },
  {
    date: new Date(2024, 9, 18),
    value: 90.1,
  },
  {
    date: new Date(2024, 9, 25),
    value: 89.2,
  },
  {
    date: new Date(2024, 10, 1),
    value: 89.9,
  },
  {
    date: new Date(2024, 10, 8),
    value: 89,
  },
  {
    date: new Date(2024, 10, 15),
    value: 88.9,
  },
]

const firstAndLastLabel = ({
  x,
  y,
  index,
  dataLength,
  value,
  unit,
}: {
  x: number,
  y: number,
  index: number,
  dataLength: number,
  value: number,
  unit: string
}) => {
  if (index == 0 || index == dataLength - 1) {
    return (
      <text x={x} y={y} dy={-10} fill="grey" fontSize="0.8rem" textAnchor="middle">
        {value}{unit}
      </text>
    );
  }
  return null;
};


export default function ChartCard({ 
  title,
  unit,
  dataKey,  // Used to retrieve the data from the API
  color="white",
}: {
  title: string
  dataKey: ApiKey,
  unit: string,
  color?: string,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.chart_header}>
        <div className={styles.data}>
          <div>
            <h2>86{unit}</h2>
            <small style={{color: color}}>-4.1{unit}</small>
          </div>
          <small>{title}</small>
        </div>
        <button className={styles.new_button}>
          <FaPlus/>
          <span>New {title}</span>
        </button>
      </div>
      <ResponsiveContainer width="100%" height="80%" minHeight={200} >
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 45,
            left: 45,
            bottom: -10,
          }}
        >
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.6}/>
              <stop offset="100%" stopColor={color} stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(d: Date) => d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
            axisLine={false}
            tickLine={false}
            minTickGap={10}
            interval="equidistantPreserveStart"
          />
          <YAxis
            domain={([dataMin, dataMax]) => {
              const padding = Math.abs(dataMin - dataMax) * 0.2;  // 10% of domain padding
              return [dataMin - padding, dataMax + padding];
            }}
            padding={{bottom: 20}}
            hide
          />
          {/* TODO custom tooltip */}
          <Tooltip/>
          <Area 
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            label={(props: any) => firstAndLastLabel({ ...props, dataLength: data.length, unit: unit })}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}