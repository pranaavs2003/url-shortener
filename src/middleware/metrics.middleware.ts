import { Request, Response, NextFunction } from "express";
import { httpRequestCount, httpRequestDuration } from "../metrics";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const route = req.route?.path || req.path;

    httpRequestCount.inc({
      method: req.method,
      route,
      status: res.statusCode,
    });

    httpRequestDuration.observe({ method: req.method, route }, duration);
  });

  next();
};
