import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed overflow-y-auto inset-0 flex items-center justify-center hz-modal-bg z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[40%] w-[60%]">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="text-sm text-gray-700 mb-4">
          This action cannot be undone. Do you really want to delete this {name}
          ?
        </p>
        <div className="flex justify-center gap-2">
          <button
            className="px-4 p-2 bg-red-500 text-white cursor-pointer rounded-lg"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="px-4 p-2 bg-gray-300 cursor-pointer rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
