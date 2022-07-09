import { Router } from "express";

import { validateApiKey, employeeExist, validateCardType } from "../middlewares/createCardMiddleware.js";
import {createNewCard, activateCard} from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/insert", validateApiKey, employeeExist, validateCardType, createNewCard);
cardRouter.put("/update", validateApiKey, activateCard);

export default cardRouter;