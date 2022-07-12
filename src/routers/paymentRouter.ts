import { Router } from "express";

import payments from "../controllers/paymentsController.js";

const paymentRouter = Router();

paymentRouter.post("/payment", payments)

export default paymentRouter;