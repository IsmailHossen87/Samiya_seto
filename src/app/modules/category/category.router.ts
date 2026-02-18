import { Router } from "express";
import fileUploadHandler from "../../middleware/fileUploadHandlare";
import { parseFormDataMiddleware } from "../../middleware/parseFromData";
import { validateRequest } from "../../middleware/validateRequest";
import { categoryValidation } from "./category.validation";
import { categoryController } from "./category.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { USER_ROLE } from "../user/user.interface";

// category.router.ts
const router = Router();

router.route("/").post(
    checkAuth(USER_ROLE.ADMIN),
    fileUploadHandler(), parseFormDataMiddleware, validateRequest(categoryValidation.createCategory), categoryController.createCategory)
    .get(checkAuth(USER_ROLE.USER), categoryController.getAllCategories)

router.route("/:id")
    .patch(
        checkAuth(USER_ROLE.ADMIN),
        fileUploadHandler(), parseFormDataMiddleware, validateRequest(categoryValidation.createCategory), categoryController.updateCategory)
    .get(checkAuth(USER_ROLE.USER), categoryController.singleCategory)

export const categoryRouter = router;
