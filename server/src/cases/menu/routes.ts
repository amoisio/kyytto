import { api } from "../../api.js";
import express from "express";
import { menu } from "./menu.js";

export const router = express.Router();

router.get(api.menu.path, (req, res) => {
  res.json(menu);
});