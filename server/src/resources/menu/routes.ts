import { api } from 'k-models';
import express from 'express';
import { menuBuilder } from './menu.js';

export const router = express.Router();

router.get(api.path, (req, res) => {
  res.redirect(api.menu.path);
});

router.get(api.menu.path, (req, res) => {
  const menu = menuBuilder(req.baseUrl);
  res.json(menu);
});