import { Router } from "express";
import { findTreasureBoxeById, findTreasureBoxes } from "./find";
import { validate, validateId } from "./validations";

const router = Router();
router.get("/:coordinates/:range", validate, findTreasureBoxes);

router.get("/:id", validateId, findTreasureBoxeById);

export default router;
