import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Food", value: 601 },
    { name: "Travel", value: 260 },
    { name: "Shopping", value: 360 },
    { name: "Grosary", value: 1000 },
    { name: "Bills", value: 1000 },
];

const COLORS = [
    "#6366F1", 
    "#EF4444", 
    "#22C55E", 
    "#F59E0B", 
    "#93C5FD",
    "#3B82F6", 
    "#8B5CF6", 
    "#14B8A6", 
    "#EC4899", 
    "#F97316", 
    "#10B981", 
    "#06B6D4", 
    "#84CC16", 
    "#A855F7", 
    "#EAB308", 
    "#0EA5E9", 
    "#D946EF", 
    "#FB7185",
    "#4ADE80",
    "#2DD4BF",
    "#60A5FA",
    "#FCA5A5",
    "#FDBA74",
    "#C084FC", 
    "#5EEAD4",
    "#FCD34D", 
    "#86EFAC", 
    "#FDA4AF", 
    "#67E8F9",
    "#DDD6FE"  
];


export default function CategoryChart() {
    const { recentExenses } = useSelector(state => state.expense)
    const formattedExpenses = recentExenses.map(exp => ({
        ...exp,
        amount: Number(exp.amount)
    }));

    
    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={formattedExpenses}
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={5}
                        dataKey="amount"
                        nameKey="category_name"
                    >
                        {formattedExpenses.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
