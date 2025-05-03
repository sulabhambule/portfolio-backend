import { Router } from "express";
import { createContactMessage } from "../controller/contact.controller.js";

const router = Router();

router.route("/contact").post(createContactMessage);

export default router;
