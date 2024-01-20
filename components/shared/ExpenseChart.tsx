"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type ExpenseChartProps = {
  data: {
    id: string;
    amount: number;
    title: string;
  }[];
  chartName: string;
  color: string;
};

export default function ExpenseChart({
  data,
  chartName,
  color,
}: ExpenseChartProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <h3 className="text-xs">{chartName}</h3>
      </div>

      <ResponsiveContainer width="100%" height={50}>
        <LineChart width={100} height={50} data={data}>
          <Tooltip />
          <XAxis dataKey="title" hide={true} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={color}
            activeDot={{ r: 8 }}
            strokeWidth={2.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
