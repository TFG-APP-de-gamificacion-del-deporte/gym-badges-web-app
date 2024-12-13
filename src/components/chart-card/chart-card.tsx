"use client";

import styles from "./chart-card.module.scss"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { CategoricalChartState } from "recharts/types/chart/types";
import { StatsKeys } from "@/api/constants";
import AddNewDataMenu from "./add-new-data-menu/add-new-data-menu";
import useSWR from "swr";
import { getDataAction } from "@/actions/stats";
import { redirect } from "next/navigation";

function firstAndLastLabel({
  x, y, index, dataLength, value, unit,
}: { 
  x: number, y: number, index: number, dataLength: number, value: number, unit: string
}) {
  if (index === 0 || index === dataLength - 1) {
    return (
      <text x={x} y={y} dy={-10} fill="grey" fontSize="0.8rem" textAnchor="middle">
        {value}{unit}
      </text>
    );
  }
  return null;
};

function customTooltip({ 
  active, payload, label, unit, 
}: { 
  active?: boolean, payload?: any[], label?: Date, unit: string 
}) {
  if (active && payload && payload.length) {
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
  title: string, unit: string, dataKey: StatsKeys, color?: string,
}) {
  // Get data from the API
  const { data, error, isLoading } = useSWR(`getDataAction-${dataKey}`, getDataAction.bind(null, dataKey));

  // Use state to store chart tooltip coords
  const [tooltipCoords, setTooltipCoords] = useState<{x: number, y: number}>();
  let areaInstance: Area | null = null;

  if (error) redirect("/internal-error");

  const lastValue = data?.length ? data[data.length - 1].value : "--";
  let variation = data?.length ? data[data.length - 1].value - data[0].value : "--";
  if (typeof variation === "number") {
    variation = variation >= 0 ? "+" + variation : variation;
  }
  
  return (
    <div className={styles.card}>
      <div className={styles.chart_header}>
        <div className={styles.data}>
          <div>
            <h2>{lastValue}{unit}</h2>
            <small style={{color: color}}>{variation}{unit}</small>
          </div>
          <small>{title}</small>
        </div>
        <AddNewDataMenu title={title} unit={unit} dataKey={dataKey}/>
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
            tickFormatter={(s: string) => new Date(s).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
            tickLine={false}
            axisLine={false}
            minTickGap={10}
            interval="equidistantPreserveStart"
          />
          { data?.length &&
            <YAxis
              domain={([dataMin, dataMax]) => {
                const padding = Math.abs(dataMin - dataMax) * 0.2;  // 20% of domain padding
                return [dataMin - padding, dataMax + padding];
              }}
              padding={{bottom: 20}}
              hide
            />
          }
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
            label={(props: any) => firstAndLastLabel({ ...props, dataLength: data?.length, unit: unit })}
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