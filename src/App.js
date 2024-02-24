import { useEffect, useState } from 'react';
import './App.css';
import { ImBin } from "react-icons/im";
import { FaMoneyBillTransfer } from "react-icons/fa6";

function App() {



  return (
    <div>
      <Navbar/>
      <UserInputSection />

    </div>
  );
}

export default App;

//userInputSection
const UserInputSection = () => {

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  const [expensesList, setExpensesList] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const storedExpenseList = JSON.parse(localStorage.getItem('expensesList'));
    if (storedExpenseList !== null) {
      setExpensesList(storedExpenseList);
    }

    const storedTotalExpense = localStorage.getItem("totalExpense");
    if (storedTotalExpense !== null){
      setTotalExpense(storedTotalExpense);
    }

  }, []);

  const onAddExpense = () => {

    if (nameInput==="" || amountInput===""){
      alert("Enter all field values");
      return;
    }
     else if(isNaN(amountInput)) {
      
      alert("Please amount only in numbers ");
      return; 

    }

    setExpensesList([...expensesList, { name: nameInput, amount: parseInt(amountInput), uniqueNo: expensesList.length }]);
    setNameInput("");
    setAmountInput("");
    setTotalExpense(totalExpense + parseInt(amountInput));
    return;
  };

  const onDeleteExp = (uniqueNo) => {
    let newExpList = [];
    let takeAmount = 0;
    for (let item of expensesList) {
      if (item.uniqueNo !== uniqueNo) {
        newExpList.push(item);
      }
      else {
        takeAmount = parseInt(item.amount);
      }
    }

    setExpensesList(newExpList);

    setTotalExpense(totalExpense - takeAmount);
  };

  const onClearExpenses = () => {
    setExpensesList([]);
    setTotalExpense(0);
  };

  const onSaveExpenses = ()=>{
    let jsonExpensesList = JSON.stringify(expensesList);
    localStorage.setItem("expensesList",jsonExpensesList);
    localStorage.setItem("totalExpense",JSON.stringify(totalExpense));
    alert("Expenses Saved");
  };

  return (
    <div className='pb-4'>
      <div className=' d-flex justify-content-center align-items-center '>
        <div className='expense-input-container col-8 p-0 addmt'>
          <h2 className='list-heading w-100 text-center pt-2'>MODIFY EXPENSES</h2>
          <div className='p-3'>
            <h5 className='text-center'>EXPENSES TOTAL :</h5>
            <p className='total-expense text-center mb-3'>R {totalExpense}</p>

            <div>
              <label className='w-25'>Expense Name :</label>
              <input className='w-75 mb-3 pl-1' value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder='Peanut Butter Sandwich' />
            </div>
            <div>
              <label className='w-25'>Expense Amount (R) :</label>
              <input className='w-75 mb-2 pl1' value={amountInput} onChange={(e) => setAmountInput(e.target.value)} placeholder='100.00' />
            </div>
            <div className='d-flex flex-row justify-content-end mt-4'>
              <button className='btn btn-success mr-3' onClick={onAddExpense}>Add Expenses</button>
              <button className='btn btn-danger mr-3' onClick={onClearExpenses}>Clear Expenses</button>
              <button className='btn btn-primary mr-3' onClick={onSaveExpenses}>Save Data</button>
            </div>

          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center align-items-center '>

        <div className='expense-input-container col-8 p-0'>
          <div className=' w-100 text-center d-flex flex-row pt-1 m-0'>
            <p className='list-heading topic'>EXPENSE</p>
            <p className='list-heading topic'>AMOUNT</p>
            <p className='list-heading topic'>DELETE</p>
          </div>
          {
            expensesList.map((expObj) => (
              <ExpenseItem expObj={expObj} onDeleteExp={onDeleteExp} />
            ))
          }

        </div>
        
      </div>
    </div>
  );
};

const ExpenseItem = (keyObj) => {

  const expName = keyObj.expObj.name;
  const expAmount = "R " + keyObj.expObj.amount;

  const onDeleteExp = () => {
    keyObj.onDeleteExp(keyObj.expObj.uniqueNo);
  }

  return (
    <div className='d-flex flex-row text-center list-item w-100  pb-1 m-0 shadow-sm'>
      <p className='topic'>{expName}</p>
      <p className='topic'>{expAmount}</p>
      <p className='topic'><ImBin className='del-icon' onClick={onDeleteExp} /></p>
    </div>
  );
};

const Navbar = () => {
  return (
      <div className='shadow-lg fixed-top' >
          <nav className="navbar navbar-expand-lg nav-bg-col pl-3 pt-1">
          <FaMoneyBillTransfer className="logo mr-4 ml-4" />
              <a id='navbar-text' className="navbar-brand nav-style" href="/"> Money <span className='nav-span-style'>Space</span></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              
          </nav>
      </div>

  )


};