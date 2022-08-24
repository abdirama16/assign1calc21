import './App.css';
import './index.css';
import Btn from './components/Btn';
import Kotakbtn from './components/Kotakbtn';
import Layar from './components/Layar';
import Wrapper from './components/Wrapper';
import React, { useState } from 'react';

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  const btnVal = [
    ["AC", "CE", "%", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "+-", "="],
  ];

  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  })

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    console.log("value yang diklik = "+value)
    if(removeSpaces(calc.num).length < 16){
      setCalc({
        ...calc,
        num: calc.num === 0 && value === "0" ? "0" 
        : removeSpaces(calc.num) % 1 === 0 ? toLocaleString(Number(removeSpaces(calc.num + value))) 
        : toLocaleString(calc.num + value), 
        res: !calc.sign ? 0 : calc.res, 
      })
    }
  }
  
  const allClearHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    })
  }

  const clearEntryHandler = () => {
    let nomor = calc.num;
    console.log("nomor awal "+nomor)
    setCalc({
      ...calc,
      sign: "",
      num: nomor.length>0 ? nomor.slice(0, -1) : nomor,
      res: 0,
    })
  }
  
  const inverterClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    })
  }
  
  const prosentageHandler = () => {
    let nomor = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let hasil = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (nomor /= Math.pow(100,1)),
      res: (hasil /= Math.pow(100,1)),
      sign: "",
    })
  }
  
  const equalClickHandler = () => {
    if(calc.sign && calc.num){
      const math = (a, b, sign) =>
      sign === "+" ? a+b
      : sign === "-" ? a-b
      : sign === "*" ? a*b
      : a / b;

      setCalc({
        ...calc,
        res: calc.num === "0" && calc.sign === "/" ? "invalid devide with zero" 
        : removeSpaces(calc.num).concat(calc.sign).concat(removeSpaces(calc.res)).concat("=").concat(toLocaleString(math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)),calc.sign))),
        sign: "",
        num: 0,
      })
    }
  }
  
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    console.log("isi operand = "+value)
    
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    })
  }
  
  const commaHandler = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + val : calc.num,
    })
  }
  
  return (
    <Wrapper>
      <Layar val={calc.num ? calc.num : calc.res}></Layar>
      <Kotakbtn>
        {
          btnVal.flat().map((tombol, i)=>{
            return (
              <Btn key={i} 
              className={
                tombol === "=" ? "equals" 
                : tombol === "/" || tombol === "*" || tombol === "-" || tombol === "+" || tombol === "%" ? "signopt"
                : ""}
              val={tombol} 
              onClick={
                tombol === "AC" ? allClearHandler
                : tombol === "CE" ? clearEntryHandler
                : tombol === "+-" ? inverterClickHandler
                : tombol === "%" ? prosentageHandler
                : tombol === "=" ? equalClickHandler
                : tombol === "/" || tombol === "*" || tombol === "-" || tombol === "+" ? signClickHandler
                : tombol === "." ? commaHandler
                : numClickHandler
              }></Btn>
            )
          })
        }
      </Kotakbtn>
    </Wrapper>
  );
}

export default App;
