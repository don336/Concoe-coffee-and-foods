import { Router } from "express";
import cropController from "../../controllers/crop";
import { checkAuth } from "../../middleware/checkAuth";

const cropRouter = Router();
cropRouter.get("/", cropController.getCrops);
cropRouter.get("/:id", checkAuth, cropController.getCrop);
cropRouter.post("/", checkAuth, cropController.postCrop);
cropRouter.put("/:id", checkAuth, cropController.updateCrop);
cropRouter.delete("/:id", checkAuth, cropController.deleteCrop);

export default cropRouter;
