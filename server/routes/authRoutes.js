import express from "express";
import {
  loginController,
  logoutController,
  registerController,
  validateUserController,
} from "../controllers/authController.js";
import {
  handleValidationError,
  validateLogin,
  validateRegister,
} from "../middlewares/validations.js";
import { authenticateUser } from "../middlewares/auth.js";
const router = express.Router();

// Register new user
router.post(
  "/register",
  validateRegister,
  handleValidationError,
  registerController
);

// login
router.post("/login", validateLogin, handleValidationError, loginController);

// validate user
router.get("/validate", authenticateUser, validateUserController);

router.post("/logout", authenticateUser, logoutController);

export default router;
