import { Router } from "express";
import { findAllUsers, findUserById } from "./find";
import { validate } from "./validations";

const router = Router();
router.get("/", findAllUsers )
    .get("/:id", validate, findUserById);

export default router;
