import { Router } from "express";

import { validateApiKey } from "../middlewares/createCardMiddleware.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { rechargeSchema } from "../schemas/rechargeSchema.js";

import rechargeEmplyeeCard from "../controllers/rechargeController.js";

const rechargeRouter = Router()

rechargeRouter.post("/recharge", validateApiKey, validateSchema(rechargeSchema), rechargeEmplyeeCard)

export default rechargeRouter;