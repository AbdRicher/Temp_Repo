import { useState, useReducer } from "react";
import { Pencil, Trash, Menu } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [{ id: Date.now(), name: action.name, amount: parseFloat(action.amount) }, ...state];
    case "EDIT":
      return state.map((expense) =>
        expense.id === action.id ? { ...expense, name: action.name, amount: parseFloat(action.amount) } : expense
      );
    case "DELETE":
      return state.filter((expense) => expense.id !== action.id);
    default:
      return state;
  }
};

export default function ExpenseManager() {
  const [expenses, dispatch] = useReducer(expenseReducer, []);
  const [history, setHistory] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !amount.trim()) return;
    const user = localStorage.getItem("userEmail");
    if (!user) {
      alert("User is not logged in");
      return;
    }
    const userID = user.split("@")[0];
    const expenseData = {
      user_id: userID,
      date: new Date().toISOString(),
      amount: parseFloat(amount),
      reason: name,
    };

    try {
      const response = await fetch("http://localhost:5001/api/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      const text = await response.text();
      const data = JSON.parse(text);
      if (response.ok) {
        setHistory((prev) => [expenseData, ...prev]);
      } else {
        alert(data.message || "Failed to add expense");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding expense");
    }

    setName("");
    setAmount("");
  };

  const handleEdit = (expense) => {
    setName(expense.name);
    setAmount(expense.amount);
    setEditingId(expense.id);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-blue-700 text-white p-4">
        <div className="flex justify-between items-center relative">
          <div className="flex gap-4">
            <img src="Finovalogo.png" alt="Logo" className="h-12" />
            <div>
              <h1 className="text-base md:text-xl font-bold">Finova</h1>
              <p className="text-xs md:text-sm">Secure your wealth, Elevate your life</p>
            </div>
          </div>
          <h1 className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            Expense Manager
          </h1>
          <div className="hidden lg:flex items-center gap-8">
            <input
              className="p-2 rounded w-64 border border-gray-500 outline-none text-white placeholder-white bg-transparent focus:bg-white focus:text-black"
              type="text"
              placeholder="Search Expense"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="lg:hidden focus:outline-none bg-transparent" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={28} />
          </button>
        </div>
        {isOpen && (
          <div className="lg:hidden flex flex-col items-center gap-4 mt-4">
            <h1 className="text-2xl font-bold bg-blue-700 p-2 rounded">Expense Manager</h1>
            <input
              className="p-2 rounded w-64 border border-gray-500 outline-none text-white placeholder-white bg-transparent focus:bg-white focus:text-black"
              type="text"
              placeholder="Search Expense"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </nav>
      <div className="flex gap-8 mt-8 flex-wrap">
        <div className="flex-1 max-w-2xl bg-white p-4 rounded shadow-md min-w-[300px]">
          <h2 className="text-xl font-bold mb-4">Expense Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart>
              <XAxis />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" stroke="#ff4500" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 pb-4 pl-4 pr-4">
          <div className="flex gap-1">
            <input className="w-1/2 p-2 border border-gray-300 rounded" placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="w-1/2 p-2 border border-gray-300 rounded" placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button className="bg-blue-500 text-white mr-2 p-3 rounded hover:bg-blue-700 focus:outline-none" onClick={handleSubmit}>
              {editingId ? "Update" : "Add"}
            </button>
          </div>
          <h2 className="text-xl font-bold mt-8">History</h2>
          <ul className="mt-4">
            {filteredExpenses.map((expense) => (
              <li key={expense.id} className="bg-white p-4 border border-gray-200 rounded mb-4 flex justify-between">
                <div>
                  <span className="font-medium">{expense.name}</span> - ${expense.amount}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(expense)} className="text-green-500">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => dispatch({ type: "DELETE", id: expense.id })} className="text-red-500">
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