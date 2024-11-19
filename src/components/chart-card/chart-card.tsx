"use client";

import { ApiKey } from "@/config/API"
import styles from "./chart-card.module.scss"
import { FaPlus } from "react-icons/fa6";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { CategoricalChartState } from "recharts/types/chart/types";
import colors from "@/public/global_vars.module.scss"

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

function firstAndLastLabel({
  x, y, index, dataLength, value, unit,
}: { 
  x: number, y: number, index: number, dataLength: number, value: number, unit: string
}) {
  if (index == 0 || index == dataLength - 1) {
    return (
      <text x={x} y={y} dy={-10} fill="grey" fontSize="0.8rem" textAnchor="middle">
        {value}{unit}
      </text>
    );
  }
  return null;
};

function customTooltip({ 
  active, payload, label, unit 
}: { 
  active?: boolean, payload?: any[], label?: Date, unit: string 
}) {
  if (active && payload && payload.length) {
    console.log(payload);
    
    return (
      <div className={styles.tooltip}>
        <small>{payload[0].value}{unit}</small>
      </div>
    );
  }

  return null;
}


export default function ChartCard({
  title, unit, dataKey, color="white",
}: { 
  title: string, dataKey: ApiKey, unit: string, color?: string,
}) {
  const [tooltipCoords, setTooltipCoords] = useState<{x: number, y: number}>()
  let areaInstance: Area | null = null;
  
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
            bottom: -8,
          }}
          // Calculates tooltip coords based on the mouse coords
          onMouseMove={(data: CategoricalChartState) => {
            // Get index of the closest point to the mouse
            const pointIndex = data.activeTooltipIndex;
            if (pointIndex !== undefined) {
              // Get coords of that point from the variable areaInstance
              const x = areaInstance?.props.points?.at(pointIndex)?.x;
              const y = areaInstance?.props.points?.at(pointIndex)?.y;
              if (x !== undefined && y !== undefined) {
                // Save tooltip coords in an useState()
                setTooltipCoords({x: x, y: y})
              }
            }
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
            tickLine={false}
            axisLine={false}
            minTickGap={10}
            interval="equidistantPreserveStart"
          />
          <YAxis
            domain={([dataMin, dataMax]) => {
              const padding = Math.abs(dataMin - dataMax) * 0.2;  // 20% of domain padding
              return [dataMin - padding, dataMax + padding];
            }}
            padding={{bottom: 20}}
            hide
          />
          <Tooltip 
            content={(props: any) => customTooltip({...props, unit: unit})}
            cursor={false}
            position={{x: tooltipCoords?.x, y: tooltipCoords?.y}}
          />
          <Area 
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            label={(props: any) => firstAndLastLabel({ ...props, dataLength: data.length, unit: unit })}
            ref={(instance: any) => {
              // Save reference to the Area element to access the list of points later
              // and get their coords to paint the tooltips
              areaInstance = instance;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}