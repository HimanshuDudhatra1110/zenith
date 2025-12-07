import express from "express";
import { authenticateUser } from "../middlewares/auth.js";
import {
  createNoteController,
  deleteNoteController,
  getNoteController,
  updateNoteController,
} from "../controllers/noteController.js";
import {
  handleValidationError,
  validateCreateNote,
  validateDeleteNote,
  validateUpdateNote,
} from "../middlewares/validations.js";

const router = express.Router();

// get : get notes
router.get("/", authenticateUser, getNoteController);

// post : create note
router.post(
  "/",
  authenticateUser,
  validateCreateNote,
  handleValidationError,
  createNoteController
);

// patch : update note
router.patch(
  "/update",
  authenticateUser,
  validateUpdateNote,
  handleValidationError,
  updateNoteController
);

// delete: delete notes
router.delete(
  "/:id",
  authenticateUser,
  validateDeleteNote,
  handleValidationError,
  deleteNoteController
);

export default router;
