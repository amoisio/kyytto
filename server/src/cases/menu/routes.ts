import express from "express";
import { Menu } from "./menu";

export const router = express.Router();

router.get('/', (req, res) => {
  res.json(new Menu());
});