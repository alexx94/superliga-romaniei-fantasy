import React from 'react';
import { Dialog } from '@headlessui/react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "Yes",  // Default button text is "Yes"
  cancelText = "No",    // Default button text is "No"
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              onConfirm();
              onClose(); // Close the dialog after confirmation
            }}
          >
            {confirmText}
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ConfirmDialog;
