import React from 'react';

const positionOptions = ['GK', 'DF', 'MF', 'FW'];

export default function PlayerFormFields({ formData, handleChange, handleMultiSelect }) {
  return (
    <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
      {Object.entries(formData).map(([key, value]) => {
        if (key === 'position') {
          const selected = value ? value.split(',') : [];
          return (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium capitalize">{key}</label>
              <select
                multiple
                value={selected}
                onChange={(e) =>
                  handleMultiSelect(
                    Array.from(e.target.selectedOptions, (opt) => opt.value)
                  )
                }
                className="border rounded px-2 py-1"
              >
                {positionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium capitalize">{key}</label>
            <input
              className="border rounded px-2 py-1"
              type={['age', 'games', 'game_starts', 'minutes', 'goals', 'assists', 'goals_pens', 'pens_made', 'cards_yellow', 'cards_red'].includes(key) ? 'number' : 'text'}
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </div>
  );
}
