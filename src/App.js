// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {

  const [currInput, setCurrInput] = useState(10);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("INR");
  const [output, setOutput] = useState();

  useEffect(function() {
    async function convert() {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${currInput}&from=${fromCurr}&to=${toCurr}`);
      const data = await res.json();
      setOutput(data.rates[toCurr]);
    }

    if(fromCurr === toCurr) return setOutput(currInput);
    convert();
  }, [currInput, fromCurr, toCurr])

    return (
      <div className="App">
        <Input input={currInput} handleCurrInput={setCurrInput}/>
        <Currency curr={fromCurr} handleSetCurr={setFromCurr}/>
        <Currency curr={toCurr} handleSetCurr={setToCurr}/>
        <Output output={output}/>
      </div>
    );
  }

  
const Input = ({ input, handleCurrInput }) => {
    return (
        <input type="text" value={input} onChange={(e) => handleCurrInput(Number(e.target.value))}/>
    )
}

const Currency = ({ curr, handleSetCurr }) => {
    return (
        <select value={curr} onChange={(e) => handleSetCurr(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
    )
}

const Output = ({ output }) => {
    return (
        <p>{output}</p>
    )
}