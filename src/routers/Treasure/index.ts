import { Router } from "express";
import { v1, v2 } from "./find";
import { validate, validateId } from "./validations";

const router = Router();
router.get("/:coordinates/:range", validate, v2.findTreasureBoxes);

router.get("/:id", validateId, v1.findTreasureBoxeById);

export default router;
