import { ArrowLeft } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewNote = () => {
  const location = useLocation();
  //   const navigate = useNavigate();
  const note = location.state?.note;

  if (!note) {
    return <div className="text-red-600">No note data available</div>;
  }
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-2xl font-medium leading-none text-gray-900">
            Note : {note.title}
          </h1>
          {/* <button
            className="flex items-center cursor-pointer text-sm font-normal text-gray-700"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft /> Back to Notes
          </button> */}
        </div>
        <div className="flex items-center gap-2.5">
          <button className="hz-bg-cyan-500 text-white cursor-pointer p-2 px-4 rounded-lg">
            Edit
          </button>
          <button className="bg-red-700 text-white cursor-pointer p-2 px-4 rounded-lg">
            Delete
          </button>
        </div>
      </div>
      <div className="hz-card">
        <div className="hz-card-header px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-900">{note.title}</h2>
        </div>
        <div className="p-6">{note.content}</div>
      </div>
    </div>
  );
};

export default ViewNote;
