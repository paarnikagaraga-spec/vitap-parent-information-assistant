
import { Router } from "express";
import { askChatbot } from "../controllers/chatbot.controller";
import { authenticateParent } from "../middleware/auth.middleware";
import { authorizeStudent } from "../middleware/student-access.middleware";

const router = Router();

router.post(
  "/",
  authenticateParent,
  authorizeStudent,
  askChatbot
);

export default router;
