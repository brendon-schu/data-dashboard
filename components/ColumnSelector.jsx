import { useState } from "react";

export default function ColumnSelector({ name, columns, visible, toggle }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block pr-4">
      <button onClick={() => setOpen(!open)} className="btn pl-4 pr-4 border border-info">
        {name} ▾
      </button>

      {open && (
        <div className="absolute z-10 mt-1 bg-white border rounded shadow p-2">
          {columns.map((col) => (
            <label key={col} className="block text-sm">
              <input
                type="checkbox"
                checked={visible.includes(col)}
                onChange={() => toggle(col)}
                className="mr-1"
              />
              {col}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

