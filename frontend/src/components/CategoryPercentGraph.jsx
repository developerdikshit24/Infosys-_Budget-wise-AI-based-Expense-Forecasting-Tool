import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
    "#6366F1", "#EF4444", "#22C55E", "#F59E0B", "#93C5FD",
    "#3B82F6", "#8B5CF6", "#14B8A6", "#EC4899", "#F97316",
    "#10B981", "#06B6D4", "#84CC16", "#A855F7", "#EAB308",
    "#0EA5E9", "#D946EF", "#FB7185", "#4ADE80", "#2DD4BF",
    "#60A5FA", "#FCA5A5", "#FDBA74", "#C084FC", "#5EEAD4",
    "#FCD34D", "#86EFAC", "#FDA4AF", "#67E8F9", "#DDD6FE"
];

export default function CategoryPercentGraph() {

    const { categoryExpenseTotal } = useSelector(state => state.expense);

    const formattedExpenses = (categoryExpenseTotal || [])
        .filter(exp => Number(exp.total) > 0)
        .map(exp => ({
            ...exp,
            total: Number(exp.total)
        }));

    const total = formattedExpenses.reduce((sum, e) => sum + e.total, 0);

    return (
        <div className="flex items-center justify-around gap-8 w-full">

            {/* Chart */}
            <div className="relative w-72 h-72">

                <ResponsiveContainer width="120%" height="100%">
                    <PieChart>

                        <Pie
                            data={formattedExpenses}
                            innerRadius={60}
                            outerRadius={110}
                            paddingAngle={3}
                            dataKey="total"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                            {formattedExpenses.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                    </PieChart>
                </ResponsiveContainer>

                {/* Center Label */}
                <div className="absolute inset-0 left-14 flex min-w-fit p-6 flex-col items-center justify-center">

                    <div className="bg-white shadow-md rounded-xl px-4 py-2 text-center">

                        <div className="text-lg font-bold text-gray-800">
                            ₹ {total.toLocaleString()} /-
                        </div>

                        <div className="text-sm text-gray-500">
                            Total suggest
                        </div>

                    </div>

                </div>

            </div>


            {/* Legend */}
            <div className="space-y-2 text-xs flex-wrap">

                {formattedExpenses.map((item, index) => (

                    <div key={index} className="flex items-center gap-3">

                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />

                        <div className="flex flex-col">

                            <div className="flex gap-2 items-center font-semibold text-gray-700">

                                <span>{item.category}</span>

                                <span className="text-blue-700">
                                    ₹ {item.total.toLocaleString()}
                                </span>

                            </div>

                            <span className="text-xs text-gray-400">
                                Expense
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}