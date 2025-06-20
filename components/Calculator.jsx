
import SidebarPanel from "@/components/SidebarPanel";
import React, { useState } from 'react';
import { evaluate } from 'mathjs';

export default function CalculatorPanel() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (val) => {
    if (val === '=') {
      try {
        const evalResult = evaluate(input);
        setResult(evalResult.toString());
      } catch (err) {
        setResult('Error');
      }
    } else if (val === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput(input + val);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
	<SidebarPanel>
    <div className="w-[200px] p-2 border bg-white rounded shadow text-sm">
      <div className="mb-1 p-1 border text-right font-mono bg-gray-100">{input || '0'}</div>
      <div className="mb-2 p-1 text-right text-gray-600 font-mono text-xs">{result}</div>
      <div className="grid grid-cols-4 gap-1">
        {buttons.map((btn) => (
          <button
            key={btn}
            className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
	</SidebarPanel>
  );
}

