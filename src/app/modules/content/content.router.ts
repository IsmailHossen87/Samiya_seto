import { Router } from "express";
import { contentController } from "./content.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { USER_ROLE } from "../user/user.interface";
import fileUploadHandler from "../../middleware/fileUploadHandlare";
import { parseFormDataMiddleware } from "../../middleware/parseFromData";

// content.router.ts
const router = Router()
router.route("/")
    .post(checkAuth(USER_ROLE.USER), fileUploadHandler(), parseFormDataMiddleware, contentController.createContent)
    .get(checkAuth(USER_ROLE.USER, USER_ROLE.ADMIN), contentController.getAllContent)


export const ContentRouter = router;