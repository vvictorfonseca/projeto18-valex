import { Router } from "express";

import payments from "../controllers/paymentsController.js";

import { validateSchema } from "../middlewares/validateSchemas.js";
import { paymentSchema } from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post("/payment", validateSchema(paymentSchema), payments)

export default paymentRouter;