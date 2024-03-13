import { Router } from "express";
import { findTreasureBoxes } from "./find";
import { validate } from "./validations";

const router = Router();
router.get("/:coordinates/:range", validate, findTreasureBoxes)

export default router;
