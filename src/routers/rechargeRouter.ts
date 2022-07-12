import { Router } from "express";

import { validateApiKey } from "../middlewares/createCardMiddleware.js";
import rechargeEmplyeeCard from "../controllers/rechargeController.js";

const rechargeRouter = Router()

rechargeRouter.post("/recharge", validateApiKey, rechargeEmplyeeCard)

export default rechargeRouter;