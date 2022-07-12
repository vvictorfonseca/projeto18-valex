import { Router } from "express";

import { validateApiKey, employeeExist, validateCardType } from "../middlewares/createCardMiddleware.js";
import { createNewCard, activateCard, getBallance, blockCard, unlockCard } from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/insert", validateApiKey, employeeExist, validateCardType, createNewCard);
cardRouter.put("/update", activateCard);
cardRouter.get("/balance", getBallance);
cardRouter.put("/block", blockCard);
cardRouter.put("/unlock", unlockCard);

export default cardRouter;