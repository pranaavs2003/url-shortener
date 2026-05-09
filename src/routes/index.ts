import { Router } from "express";
import { createUrl } from "../controllers/shorten.controller";
import { fetchUrl } from "../controllers/fetch.controller";
import { validator } from "../middleware/validator.middleware";
import { createUrlSchema } from "../validators/url.validator";
import { register } from "../metrics";

const router = Router();

router.get("/health", async (req, res) => {
  res.status(200).json({ message: "Server is up and running." });
});

router.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.send(await register.metrics());
});

router.post("/shorten", validator(createUrlSchema), createUrl);
router.get("/:shortCode", fetchUrl);

export default router;
