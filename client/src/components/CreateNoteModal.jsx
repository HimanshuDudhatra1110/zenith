import React, { useState } from "react";

const CreateNoteModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed overflow-y-auto inset-0 flex items-center justify-center hz-modal-bg z-50">
      <div className="bg-white p-6 rounded-lg lg:w-[60%] w-[80%] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
        <input
          className="w-full border border-gray-200 px-3 py-2 mb-3 rounded-md focus:border-[#00ADB5] focus:outline-none"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full border border-gray-200 px-3 py-2 mb-3 min-h-50 rounded-md focus:border-[#00ADB5] focus:outline-none"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <div className="flex justify-center gap-2">
          <button
            className="hz-bg-cyan-500 text-white cursor-pointer p-2 px-4 rounded-lg"
            onClick={() => onSave({ title, content })}
          >
            Save
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

export default CreateNoteModal;
