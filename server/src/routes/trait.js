import { Router } from "express";
import { getTraits } from "../controllers/trait.js";

const router = Router();

router.get("/", getTraits);

export default router;
