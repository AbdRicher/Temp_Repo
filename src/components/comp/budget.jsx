import { useState, useReducer } from "react";
import { Pencil, Trash, Menu } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./budget.css";

// Budget Reducer Function
const budgetReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        {
          id: Date.now(),
          name: action.name,
          amount: parseFloat(action.amount),
        },
        ...state,
      ];
    case "EDIT":
      return state.map((budget) =>
        budget.id === action.id
          ? { ...budget, name: action.name, amount: parseFloat(action.amount) }
          : budget
      );
    case "DELETE":
      return state.filter((budget) => budget.id !== action.id);
    default:
      return state;
  }
};

export default function BudgetManager() {
  const [budgets, dispatch] = useReducer(budgetReducer, []);
  const [history, setHistory] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Toggle state for menu
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Function to handle adding budget
  const handleSubmit = async () => {
    if (!name.trim() || !amount.trim()) return;

    const user = localStorage.getItem("userEmail");
    if (!user) {
      alert("User is not logged in");
      return;
    }

    const userID = user.split("@")[0];

    const budgetData = {
      user_id: userID,
      date: new Date().toISOString(),
      amount: parseFloat(amount),
      source: name,
    };

    try {
      const response = await fetch("http://localhost:5001/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budgetData),
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (response.ok) {
        setHistory((prev) => [budgetData, ...prev]); // Update history state
      } else {
        alert(data.message || "Failed to add budget");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding budget");
    }

    setName("");
    setAmount("");
  };

  // Function to handle editing budget
  const handleEdit = (budget) => {
    setName(budget.name);
    setAmount(budget.amount);
    setEditingId(budget.id);
  };

  const filteredBudgets = budgets.filter((budget) =>
    budget.name.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = history.reduce((acc, item) => {
    const date = new Date(item.id).toLocaleDateString();
    const existing = acc.find((data) => data.date === date);
    if (existing) {
      existing.amount += parseFloat(item.amount);
    } else {
      acc.push({ date, amount: parseFloat(item.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white p-4">
        <div className="flex justify-between items-center relative">
          {/* Left side - Logo & Title */}
          <div className="flex gap-4">
            <img src="Finovalogo.png" alt="Logo" className="h-12" />
            <div>
              <h1 className="text-base md:text-xl font-bold">Finova</h1>
              <p className="text-xs md:text-sm">
                Secure your wealth, Elevate your life
              </p>
            </div>
          </div>

          {/* Center - Budget Manager */}
          <h1 className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            Budget Manager
          </h1>

          {/* Right Side - Search Bar (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-8">
            <input
              className="p-2 rounded w-64 border border-gray-500 outline-none text-white placeholder-white bg-transparent focus:bg-white focus:text-black"
              type="text"
              placeholder="Search Budget"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden focus:outline-none bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Menu - Now Toggles Properly */}
        {isOpen && (
          <div className="lg:hidden flex flex-col items-center gap-4 mt-4">
            <h1 className="text-2xl font-bold bg-blue-700 p-2 rounded">
              Budget Manager
            </h1>
            <input
              className="p-2 rounded w-64 border border-gray-500 outline-none text-white placeholder-white bg-transparent focus:bg-white focus:text-black"
              type="text"
              placeholder="Search Budget"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex gap-8 mt-8 flex-wrap">
        {/* Chart Section */}
        <div className="flex-1 max-w-2xl bg-white p-4 rounded shadow-md min-w-[300px]">
          <h2 className="text-xl font-bold mb-4">Budget Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="amount" stroke="#007bff" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Form & History */}
        <div className="flex-1 pb-4 pl-4 pr-4">
          <div className="flex gap-1">
            <input
              className="w-1/2 p-2 border border-gray-300 rounded"
              placeholder="Budget Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-1/2 p-2 border border-gray-300 rounded"
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white mr-2 p-3 rounded hover:bg-blue-700 focus:outline-none"
              onClick={handleSubmit}
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
          <h2 className="text-xl font-bold mt-8">History</h2>
          <ul className="mt-4">
            {filteredBudgets.map((budget) => (
              <li
                key={budget.id}
                className="bg-white p-4 border border-gray-200 rounded mb-4 flex justify-between"
              >
                <div>
                  <span className="font-medium">{budget.name}</span> - PKR{" "}
                  {budget.amount}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(budget)}
                    className="text-green-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => dispatch({ type: "DELETE", id: budget.id })}
                    className="text-red-500"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
