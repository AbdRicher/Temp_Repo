
import "./App.css";
import Register from "./components/register";
// import Login from "./components/comp/login";
import Signup from "./components/comp/register"
import Login from "./components/comp/login";
// import Dashboard from "./components/comp/dashboard";
import FinanceGoals from "./components/comp/financeGoals"
import InvestmentTracker from "./components/comp/Investment"
// import Login from "./components/login"
import BudgetManager from "./components/comp/budget";
import ExpenseManager from "./components/comp/Expenses";
import SummaryAnalysis from "./components/comp/userstats";
import LossProfit from "./components/comp/loss-profit";
import Sidebar from "./components/comp/sidebar"
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
 <BrowserRouter> 
      <Routes > 
        // <Route path="/" element={<Login/>} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </BrowserRouter>




    {/* <Dashboard/> */}

{/* this is Tailwind  */}
    {/* <BudgetManager/> */}
    {/* <ExpenseManager/> */}
    {/* <Sidebar/> */}
    {/* <Signup/>
    <Login/> */}



{/* Those with their css files  */}
    {/* <SummaryAnalysis budgets={[]} expenses={[]} /> */}
    {/* <InvestmentTracker/> */}
    {/* <FinanceGoals/> */}
    {/* <LossProfit budgets={[]} expenses={[]} /> */}


    
    
    </>
  );
}

export default App;
