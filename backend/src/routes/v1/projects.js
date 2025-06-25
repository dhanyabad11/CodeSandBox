import express from "express";

const router = express.Router();

router.post("/", createProjectControll);

export default router;
