import React, { useState } from 'react';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [first, setFirst] = useState('');
  const [op, setOp] = useState<string | null>(null);
  const [reset, setReset] = useState(false);

  const append = (n: string) => {
    if (display === '0' || reset) {
      setDisplay(n);
      setReset(false);
    } else if (!(n === '.' && display.includes('.'))) {
      setDisplay(display + n);
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirst('');
    setOp(null);
    setReset(false);
  };

  const del = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const operator = (o: string) => {
    setFirst(display);
    setOp(o);
    setReset(true);
  };

  const calc = () => {
    if (!op) return;
    const a = parseFloat(first);
    const b = parseFloat(display);
    let r = 0;
    switch (op) {
      case '+': r = a + b; break;
      case '-': r = a - b; break;
      case '*': r = a * b; break;
      case '÷': r = a / b; break;
      case '%': r = a % b; break;
    }
    setDisplay(String(Math.round(r * 1000) / 1000));
    setOp(null);
  };

  const btns = ['7','8','9','+','4','5','6','-','1','2','3','*','0','.','⌫','÷','=','C','%'];

  return (
    <div className="calculator">
      <div id="display">{display}</div>
      <div className="buttons">
        {btns.map((b,i)=>{
          if (b==='=') return <button key={i} className="btn equals" onClick={calc}>=</button>;
          if (b==='C') return <button key={i} className="btn clear" onClick={clear}>C</button>;
          if (b==='⌫') return <button key={i} className="delete" onClick={del}>⌫</button>;
          if ('+-*÷%'.includes(b)) return <button key={i} className="btn operator" onClick={()=>operator(b)}>{b}</button>;
          return <button key={i} className="btn number" onClick={()=>append(b)}>{b}</button>;
        })}
      </div>
    </div>
  );
}
