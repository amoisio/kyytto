import express from "express";
import { menu } from "./menu.js";

export const router = express.Router();

router.get('/', (req, res) => {
  res.json(menu);
});