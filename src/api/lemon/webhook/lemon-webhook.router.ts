import { Router } from "express";
import lemonWebhookController from "./lemon-webhook.controller";
import Guard from "../../../middlewares/guards";

const router = Router();

router.post("/", Guard.checkLemonSignature, lemonWebhookController.webhook);

export default router;