import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Col, Container, Row } from "react-bootstrap";
import { TextField, InputLabel, MenuItem, Select } from "@mui/material";
import {
  getCategories,
  getSubCategories,
  getPaymentTypes,
  postPaymentDetails,
} from "../../services";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./ExpenseForm.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ExpenseForm = (props) => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//   const [paymentTypes, setPaymentTypes] = useState([]);
//   const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [paymentTitle, setPaymentTitle] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [date, setDate] = useState(null);
  const {
    setExpenseListChanged,
    categories,
    selectedCategory,
    handleCategorySelect,
    subCategories,
    selectedSubCategory,
    handleSubCategorySelect,
    paymentTypes,
    selectedPaymentType,
    handlePaymentTypeSelect
  } = props;

//   useEffect(() => {
//     let response = getCategories();
//     response.then((data) => {
//       setCategories(data);
//     });
//     let paymentTypeResponse = getPaymentTypes();
//     paymentTypeResponse.then((data) => {
//       console.log(data);
//       setPaymentTypes(data);
//     });
//   }, []);


//   useEffect(() => {
//     if (selectedCategory !== null) {
//       let response = getSubCategories(selectedCategory);
//       response.then((data) => {
//         setSubCategories(data?.sub_categories);
//       });
//     }
//   }, [selectedCategory]);

  const handlePaymentTitleChange = (e) => {
    setPaymentTitle(e.target.value);
  };
  const handlePaymentAmountChange = (e) => {
    e.preventDefault();
    setPaymentAmount(e.target.value);
  };

//   const handleCategorySelect = (e) => {
//     e.preventDefault();
//     console.log(e.target);
//     setSelectedCategory(e.target.value);
//   };

//   const handleSubCategorySelect = (e) => {
//     e.preventDefault();
//     console.log(e.target);
//     setSelectedSubCategory(e.target.value);
//   };

//   const handlePaymentTypeSelect = (e) => {
//     e.preventDefault();
//     console.log(e.target);
//     setSelectedPaymentType(e.target.value);
//   };

  const handleSubmit = () => {
    let data = {
      title: paymentTitle,
      amount: paymentAmount,
      category: selectedCategory,
      sub_category: selectedSubCategory,
      payment_type: selectedPaymentType,
      created_at: date,
    };
    console.log(data);
    let response = postPaymentDetails(data);
    response.then((data) => {
      console.log(data);
      setExpenseListChanged(true)

    });
  };
  return (
    <div className="expense-form-wrapper">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Container>
            <Row>
              <Col>
                <InputLabel>Category</InputLabel>
                <Select
                  id="category-select"
                  value={selectedCategory}
                  label="Category"
                  onChange={((e)=>{
                    handleCategorySelect(e);
                  })}
                >
                  {categories?.map((element) => {
                    return (
                      <MenuItem value={element?.id}>{element?.name}</MenuItem>
                    );
                  })}
                </Select>
              </Col>

              <Col>
                <InputLabel>Sub Category</InputLabel>
                <Select
                  id="sub-category-select"
                  value={selectedSubCategory}
                  label="Sub Category"
                  onChange={((e)=>{
                    handleSubCategorySelect(e)
                  })}
                  defaultValue={0}
                >
                  <MenuItem value={0}>Select Sub Category</MenuItem>
                  {subCategories?.map((element) => {
                    return (
                      <MenuItem value={element?.id}>{element?.name}</MenuItem>
                    );
                  })}
                </Select>
              </Col>

              <Col>
                <InputLabel>Payment type</InputLabel>
                <Select
                  id="payment-type-select"
                  value={selectedPaymentType}
                  label="Sub Category"
                  onChange={((e)=>{
                    handlePaymentTypeSelect(e)
                  })}
                >
                  {paymentTypes?.map((element) => {
                    return (
                      <MenuItem value={element?.id}>{element?.name}</MenuItem>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputLabel>Title</InputLabel>
                <TextField
                  value={paymentTitle}
                  id="outlined-basic"
                  color="primary"
                  onChange={handlePaymentTitleChange}
                  placeholder="Title"
                />
              </Col>
              <Col>
                <InputLabel>Amount</InputLabel>
                <TextField
                  type="number"
                  onChange={handlePaymentAmountChange}
                  variant="outlined"
                  value={paymentAmount}
                />
              </Col>
              <Col>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel>Date</InputLabel>
                  <DatePicker
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Col>
            </Row>
          </Container>
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ExpenseForm;
