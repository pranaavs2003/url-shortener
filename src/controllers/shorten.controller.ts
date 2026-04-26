import { Request, Response } from "express";
import * as shortenService from "../services/shorten.service";

export const createUrl = async (req: Request, res: Response) => {
  try {
    const shortCode = await shortenService.createUrl(req.body);
    res.status(201).json({ shortCode: shortCode });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
