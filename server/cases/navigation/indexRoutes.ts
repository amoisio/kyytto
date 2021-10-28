import express from "express";
import { getLinkBuilder } from "../../lib/utilities";
import { PageDto } from "./pageDto";

export const router = express.Router();

router.get('/', (req, res) => {
    const lb = getLinkBuilder();
    const dto = PageDto.create('index', lb);
    dto.pages = [];
    dto.pages.push(PageDto.create("todos", lb.addSegment('/todos')));
    dto.pages.push(PageDto.create("hours", lb.addSegment('/hours')));
    dto.pages.push(PageDto.create("learning", lb.addSegment('/learning')));
    res.json(dto);
});