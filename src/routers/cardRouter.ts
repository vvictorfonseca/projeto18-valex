import { Router } from "express";

import { validateApiKey, employeeExist, validateCardType } from "../middlewares/createCardMiddleware.js";
import { createNewCard, activateCard, getBallance, blockCard, unlockCard } from "../controllers/cardController.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { createCardSchema } from "../schemas/createCardSchema.js";
import { activateCardSchema } from "../schemas/activateCardSchema.js";
import { cardBlockSchema } from "../schemas/cardBlockSchema.js"

const cardRouter = Router();

cardRouter.post("/insert", validateApiKey, employeeExist, validateSchema(createCardSchema), validateCardType, createNewCard);
cardRouter.put("/update", validateSchema(activateCardSchema), activateCard);
cardRouter.get("/balance", getBallance);
cardRouter.put("/block", validateSchema(cardBlockSchema), blockCard);
cardRouter.put("/unlock", validateSchema(cardBlockSchema), unlockCard);

export default cardRouter;