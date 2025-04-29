import React from 'react';

export default function PlayerFormFooter({ onCancel, onSubmit, error }) {
  return (
    <div className="flex flex-col space-y-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </div>
  );
}
