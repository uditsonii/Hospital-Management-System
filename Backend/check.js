const express = require("express");
const app = express();
const port = 8080;

const generatePid = () => {
  const now = new Date("03/03/2015");

  const date = now.getDate().toString().padStart(2, 0);
  const month = now.getMonth().toString().padStart(2, 0);
  const year = now.getFullYear().toString().slice(-2);

  console.log("date", date, "month", month, "year", year);

  const datePart = date + month + year;

  console.log(datePart);
};

const checkargument = (...rest) => {
    const {name} = rest[0];  //gives name
    console.log(name);
    const value = rest[0];   // gives first array
    console.log(value);
    const {info} = rest[0];   
    console.log(info);
}
// checkargument({name: "hello", age: 40, info: {value: "arr", salary: 50000}}, {name: "hiii", age: 50});

// generatePid();
// const randomNo = Math.floor(Math.random() * 9999);   if we use 9999 then 1000+9998 = 10999 so we use 9000 then it use 1000+8999 = 9999
// console.log(randomNo);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const now = new Date();
const time = now.getTime().toString().slice(-4);

  const timePart = now.getTime().toString().slice(-4);
  // const randomNo = Math.floor(100 + Math.random() * 900);
console.log(timePart);