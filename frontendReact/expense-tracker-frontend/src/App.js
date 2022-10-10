import logo from "./logo.svg";
import "./App.css";
import { ReusableAppBar } from "./components/reusable/ReusableAppBar";
import { useEffect, useState } from "react";
import {
  getCategories,
  getSubCategories,
  getPaymentTypes,
  getExpenses,
  updateExpense
} from "./services";
import { Box, FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import ExpenseForm from "./components/expenseForm/ExpenseForm";
import ExpenseList from "./components/expenseList/ExpenseList";

const App = () => {
  const [openForm, setOpenForm] = useState(false)
  const [expenseList, setExpenseList] = useState([])
  const [expenseListChanged, setExpenseListChanged] = useState(false)
   const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [subCategories, setSubCategories] = useState([]);
   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
   const [paymentTypes, setPaymentTypes] = useState([]);
   const [selectedPaymentType, setSelectedPaymentType] = useState(null);
   const [paymentTitle, setPaymentTitle] = useState(null);
   const [paymentAmount, setPaymentAmount] = useState(0);
   const [date, setDate] = useState(null);
  

   useEffect(() => {
     let response = getCategories();
     response.then((data) => {
       setCategories(data);
     });
     let paymentTypeResponse = getPaymentTypes();
     paymentTypeResponse.then((data) => {
       console.log(data);
       setPaymentTypes(data);
     });
   }, []);

   useEffect(() => {
     if (selectedCategory !== null) {
      console.log('selected category changed')
       let response = getSubCategories(selectedCategory);
       response.then((data) => {
         setSubCategories(data?.sub_categories);
       });
     }
   }, [selectedCategory]);

  useEffect(()=>{

    setNewExpenseList()
  }, [])

  useEffect(()=>{
    if(expenseListChanged){
      setNewExpenseList()

    }
  }, [expenseListChanged])

   const handleCategorySelect = (e) => {
     e.preventDefault();
     console.log(e.target);
     setSelectedCategory(e.target.value);
   };

   const handleSubCategorySelect = (e) => {
     e.preventDefault();
     console.log(e.target);
     setSelectedSubCategory(e.target.value);
   };

   const handlePaymentTypeSelect = (e) => {
     e.preventDefault();
     console.log(e.target);
     setSelectedPaymentType(e.target.value);
   };

  const setNewExpenseList=()=>{
     let response = getExpenses()
      response.then((data)=>{
        setExpenseList(data)
        if(expenseListChanged){
          setExpenseListChanged(false)
        }
    
  })}

  const editPayment=(paymentObj)=>{
    console.log(paymentObj)
    let response = updateExpense(paymentObj)
    response.then((data)=>{
      console.log(data)
    })
  }

  const handleClose = () => setOpenForm(false)
  const handleOpen = () => setOpenForm(true)
 
  return (
    <>
      <ReusableAppBar title="Expense Tracker" setOpenForm={setOpenForm} />

      {openForm && (
        <Modal
          open={openForm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="universal-container">
            <ExpenseForm
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleCategorySelect={handleCategorySelect}
              setExpenseListChanged={setExpenseListChanged}
              subCategories={subCategories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedCategory}
              handleSubCategorySelect={handleSubCategorySelect}
              paymentTypes={paymentTypes}
              selectedPaymentType={selectedPaymentType}
              handlePaymentTypeSelect={handlePaymentTypeSelect}
            />
          </div>
        </Modal>
      )}

      <div className="universal-container">
        <ExpenseList
          expenseList={expenseList}
          categories={categories}
          setExpenseListChanged={setExpenseListChanged}
          subCategories={subCategories}
          setSubCategories={setSubCategories}
          setSelectedCategory={setSelectedCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          paymentTypes={paymentTypes}
          selectedPaymentType={selectedPaymentType}
          setSelectedPaymentType={setSelectedPaymentType}
          editPayment={editPayment}
        />
      </div>
    </>
  );
};

export default App;
