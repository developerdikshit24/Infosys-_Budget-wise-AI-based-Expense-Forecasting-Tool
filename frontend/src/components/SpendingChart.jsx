import { useSelector } from "react-redux";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function SpendingChart() {

    const { dashboardData } = useSelector(state=> state.expense)
    return (
        <div className="w-full h-72 px-6 py-4 ">

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData?.spending_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6366F1"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
