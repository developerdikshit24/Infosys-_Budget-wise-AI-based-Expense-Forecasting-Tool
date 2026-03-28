import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransactionFilterOption } from "../stores/expense";

export default function MonthSelect() {
    const dispatch = useDispatch()
   
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const [selected, setSelected] = useState("ALL");
    
    const months = useMemo(() => {
        return Array.from({ length: currentMonth + 1 }, (_, i) => ({
            value: `${String(i)}`,
            label: `${new Date(0, i).toLocaleString("en-IN", {
                month: "long",
            })} ${currentYear}`,
        }));
    }, [currentMonth, currentYear]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        dispatch(updateTransactionFilterOption(value))
    };

    return (
        <div className="w-64">
            <select
                value={selected}
                onChange={handleChange}
                className="w-full p-2 bg-white/80 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="ALL">All</option>

                {months.map((month) => (
                    <option key={month.value} value={month.value}>
                        {month.label}
                    </option>
                ))}
            </select>
        </div>
    );
}