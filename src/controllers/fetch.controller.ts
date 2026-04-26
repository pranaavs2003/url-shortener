import { Request, Response } from "express";
import * as fetchService from "../services/fetch.service";

export const fetchUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await fetchService.fetchUrl(shortCode as string);
    res.status(200).json({ originalUrl: originalUrl });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
