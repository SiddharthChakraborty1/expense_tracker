import { Button, Card, TextField, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./ExpenseItem.css";
import { getSubCategories } from "../../services";

const ExpenseItem = (props) => {
  const {
    expenseObject,
    handleDelete,
    categories,
    subCategories,
    paymentTypes,
    setSelectedCategory,
    setSelectedSubCategory,
    selectedCategory,
    selectedSubCategory,
    selectedPaymentType,
    setSelectedPaymentType,
    editPayment,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(expenseObject?.title);
  const [editAmount, setEditAmount] = useState(expenseObject?.amount);
  const [editDate, setEditDate] = useState(expenseObject?.created_at);
  const [shouldUpdate, setShouldUpdate] = useState(false)


  useEffect(()=>{

    if(shouldUpdate){
        let newExpenseObj = {
            id: expenseObject?.id,
            amount: editAmount ? editAmount : expenseObject?.amount,
            title: editTitle ? editTitle : expenseObject?.title,
            created_at: editDate ? editDate : expenseObject?.created_at,
            payment_type: selectedPaymentType ? selectedPaymentType : expenseObject?.payment_type,
            category: selectedCategory ? selectedCategory : expenseObject?.category?.id,
            sub_category: selectedSubCategory ? selectedSubCategory : expenseObject.sub_category?.id
        }
        editPayment(newExpenseObj)
        setShouldUpdate(false)
    }
  }, [shouldUpdate])

  const onDeleteClick = (e) => {
    e.preventDefault();
    handleDelete(expenseObject?.id);
  };

  const onEditClick = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    handleEdit();
  };

  const handleEdit=()=>{
    if(isEdit) {
            console.log('details changed')
            setShouldUpdate(true)

        }
  }

  

  const date = new Date(expenseObject?.created_at);

  return (
    <>
      <Container className="expense-item-wrapper">
        <Row>
          <Col>
            {isEdit ? (
              <TextField
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                }}
              />
            ) : (
              <Typography variant="h6">{expenseObject?.title}</Typography>
            )}
          </Col>
          <Col>
            {isEdit ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={editDate}
                  onChange={(newValue) => {
                    setEditDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            ) : (
              <Typography fontSize={13}>
                Date: {date.getDate()}/{date.getMonth() + 1}/
                {date.getFullYear()}
              </Typography>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {isEdit ? (
              <div>
                <InputLabel>Category</InputLabel>
                <Select
                  id="category-select"
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => {
                    console.log(e);
                    setSelectedCategory(e.target.value);
                  }}
                >
                  {categories?.map((element) => {
                    return (
                      <MenuItem value={element?.id}>{element?.name}</MenuItem>
                    );
                  })}
                </Select>
              </div>
            ) : (
              <Typography fontSize={13}>
                Category: {expenseObject?.category?.name}
              </Typography>
            )}
          </Col>
          <Col>
            {isEdit ? (
              <div>
                <InputLabel>Sub Category</InputLabel>
                <Select
                  id="sub-category-select"
                  value={selectedSubCategory}
                  label="Sub Category"
                  onChange={(e) => {
                    console.log(e);
                    setSelectedSubCategory(e.target.value);
                  }}
                >
                  {subCategories?.map((element) => {
                    return (
                      <MenuItem value={element?.id}>{element?.name}</MenuItem>
                    );
                  })}
                </Select>
              </div>
            ) : (
              <Typography fontSize={13}>
                Sub Category: {expenseObject?.sub_category?.name}
              </Typography>
            )}
          </Col>
          <Col>
            {isEdit ? (
              <div>
                <InputLabel>Amount</InputLabel>
                <TextField
                  value={editAmount}
                  type="number"
                  onChange={(e) => {
                    setEditAmount(e.target.value);
                  }}
                />
              </div>
            ) : (
              <Typography fontSize={13}>
                Amount: {expenseObject?.amount}
              </Typography>
            )}
          </Col>
          <Col>
            {isEdit ? (
              <div>
                <InputLabel>Payment Type</InputLabel>
                <Select
                  id="payment-type-select"
                  value={selectedPaymentType}
                  label="Payment type"
                  onChange={(e) => {
                    console.log(e);
                    setSelectedPaymentType(e.target.value);
                  }}
                >
                  {paymentTypes?.map((element) => {
                    return (
                      <MenuItem value={element?.id}>{element?.name}</MenuItem>
                    );
                  })}
                </Select>
              </div>
            ) : (
              <Typography fontSize={13}>
                Payment type: {expenseObject?.payment_type?.name}
              </Typography>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <Button
              onClick={(e) => {
                onEditClick(e);
              }}
              variant="outlined"
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Col>
          <Col sm={2}>
            <Button
              disabled={isEdit}
              onClick={onDeleteClick}
              variant="outlined"
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExpenseItem;
