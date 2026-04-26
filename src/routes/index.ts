import { Router } from "express";
import { createUrl } from "../controllers/shorten.controller";
import { fetchUrl } from "../controllers/fetch.controller";
import { validator } from "../middleware/validator.middleware";
import { createUrlSchema } from "../validators/url.validator";

const router = Router();

router.post("/shorten", validator(createUrlSchema), createUrl);
router.get("/:shortCode", fetchUrl);

export default router;
