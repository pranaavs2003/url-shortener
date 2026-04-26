import { Router } from "express";
import { createUrl } from "../controllers/shorten.controller";
import { validator } from "../middleware/validator.middleware";
import { createUrlSchema } from "../validators/url.validator";

const router = Router();

router.post("/shorten", validator(createUrlSchema), createUrl);

export default router;
