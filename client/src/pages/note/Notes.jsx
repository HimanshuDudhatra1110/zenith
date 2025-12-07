import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { NOTE } from "../../constants/routes";
import EditNoteModal from "../../components/EditNoteModal";
import CreateNoteModal from "../../components/CreateNoteModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
const Notes = () => {
  const [notes, setNotes] = useState(null);
  const [totalNotes, setTotalNotes] = useState();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editNote, setEditNote] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [openCreateNoteModal, setOpenCreateNoteModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const responses = await api.get("/v1/note");
        setNotes(responses.data.notes);
        setTotalNotes(responses.data.totalNotes);
      } catch (error) {
        console.error("Error in fetching notes", error);
        setError("Failed to fetch notes");
      }
    };
    getNotes();
  }, []);

  const handleNoteClick = (note) => {
    navigate(`${NOTE}/${note._id}`, { state: { note } });
  };

  // handle toggling menu
  const toggleMenu = (event, noteId) => {
    event.stopPropagation(); // Prevent note click event
    setOpenMenuId((prev) => (prev === noteId ? null : noteId));
  };

  // Close menu when click outside menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".hz-dropdown")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // handle edit note
  const handleEdit = (note) => {
    setEditNote(note);
    setOpenMenuId(null);
  };

  // handle saving edited note
  const handleSaveEdited = async (updatedNote) => {
    try {
      const response = await api.patch("/v1/note/update", updatedNote);

      // set notes with new updated note
      setNotes((prev) =>
        prev.map((n) => (n._id === updatedNote.noteId ? response.data.note : n))
      );
    } catch (err) {
      console.error("Error updating note", error);
      setError("Failed to update note");
    }
    setEditNote(null);
  };

  // handle create note
  const handleCreate = async (newNote) => {
    try {
      const response = await api.post("/v1/note", newNote);
      setNotes((prev) => [response.data.note, ...prev]);
    } catch (error) {
      console.error("Error creating note", error);
      setError("Failed to create note");
    }
    // to close modal
    setOpenCreateNoteModal(false);
  };

  // handle delete note
  const handleDelete = async () => {
    try {
      await api.delete(`/v1/note/${deleteNoteId}`);
      setNotes((prev) => prev.filter((n) => n._id !== deleteNoteId));
    } catch (error) {
      console.error("Error deleting note", error);
      setError("Failed to delete note");
    }
    setDeleteNoteId(null);
  };
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-2xl font-medium leading-none text-gray-900">
            Notes
          </h1>
          <div className="flex items-center gap-2 text-sm font-normal text-gray-700">
            Capture and organize your thoughts effortlessly.
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            className="hz-bg-cyan-500 text-white cursor-pointer p-2 px-4 rounded-lg"
            onClick={() => setOpenCreateNoteModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}
      {notes === null ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="hz-card p-5 lg:p-7">
              <Skeleton height={24} width={150} />
              <Skeleton count={3} />
            </div>
          ))}
        </div>
      ) : notes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7">
          {notes.map((note) => (
            <div
              key={note._id}
              className="hz-card p-5 cursor-pointer lg:p-7"
              onClick={() => handleNoteClick(note)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl font-medium leading-none text-gray-900">
                    {note.title}
                  </span>
                  <div className="hz-dropdown relative">
                    <button
                      className="p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                      onClick={(e) => toggleMenu(e, note._id)}
                    >
                      <EllipsisVertical />
                    </button>
                    {openMenuId === note._id && (
                      <div className="absolute right-0 flex flex-col gap-1 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                          className="flex px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(note);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="flex px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-red-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteNoteId(note._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700 leading-5">
                  {note.content.length > 100
                    ? note.content.slice(0, 100) + "..."
                    : note.content}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-7">
          <span className="text-2xl font-normal text-gray-900">
            No Notes Found
          </span>
          <span className="text-xl font-normal text-gray-800">
            Create your first not by clicking below button.
          </span>
          <button
            className="hz-bg-cyan-500 text-white cursor-pointer p-2 px-4 rounded-lg"
            onClick={() => setOpenCreateNoteModal(true)}
          >
            Create Note
          </button>
        </div>
      )}
      <EditNoteModal
        isOpen={!!editNote}
        onClose={() => setEditNote(null)}
        note={editNote}
        onSave={handleSaveEdited}
      />
      <CreateNoteModal
        isOpen={openCreateNoteModal}
        onClose={() => setOpenCreateNoteModal(false)}
        onSave={handleCreate}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteNoteId}
        onClose={() => setDeleteNoteId(null)}
        onConfirm={handleDelete}
        name="note"
      />
    </div>
  );
};

export default Notes;
