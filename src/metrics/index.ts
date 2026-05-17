import {
  Registry,
  collectDefaultMetrics,
  Counter,
  Histogram,
} from "prom-client";

export const register = new Registry();

collectDefaultMetrics({ register });

export const httpRequestCount = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "status", "route"],
  registers: [register],
});

export const httpRequestDuration = new Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route"],
  registers: [register],
});

export const cacheHitCount = new Counter({
  name: "cache_hit_count",
  help: "Total number of Cache hit",
  labelNames: ["method", "status", "route"],
  registers: [register],
});

export const cacheMissCount = new Counter({
  name: "cache_miss_count",
  help: "Total number of Cache miss",
  labelNames: ["method", "status", "route"],
  registers: [register],
});
