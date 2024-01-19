"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

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
        <Select>
          <SelectTrigger className="h-6 w-full border-none bg-slate-100 p-0 text-xs outline-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="light">
              Light
            </SelectItem>
            <SelectItem className="text-xs" value="dark">
              Dark
            </SelectItem>
            <SelectItem className="text-xs" value="system">
              System
            </SelectItem>
          </SelectContent>
        </Select>
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
