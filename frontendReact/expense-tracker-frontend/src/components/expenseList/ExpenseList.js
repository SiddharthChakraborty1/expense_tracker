import { Card } from "@mui/material";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { deletePayment } from "../../services";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

const ExpenseList = (props) => {
  const {
    setExpenseListChanged,
    categories,
    subCategories,
    setSelectedCategory,
    setSelectedSubCategory,
    selectedCategory,
    selectedSubCategory,
    paymentTypes,
    selectedPaymentType,
    setSelectedPaymentType,
    editPayment,
  } = props;

  const handleDelete = (id) => {
    console.log("handle delete called");
    console.log("id is ", id);
    let response = deletePayment(id);
    response.then((data) => {
      console.log(data);
      setExpenseListChanged(true);
    });
  };


  return (
    <div className="expense-list-wrapper">
      <Card>
        <BasicTabs />
        {props.expenseList?.map((element) => {
          return (
            <ExpenseItem
              handleDelete={handleDelete}
              key={element.id}
              expenseObject={element}
              categories={categories}
              subCategories={subCategories}
              paymentTypes={paymentTypes}
              setSelectedCategory={setSelectedCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              selectedPaymentType={selectedPaymentType}
              setSelectedPaymentType={setSelectedPaymentType}
              editPayment={editPayment}
            />
          );
        })}
      </Card>
    </div>
  );
};

export default ExpenseList;
