import { Router } from "express";
import { favouriteController } from "./favourite.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { USER_ROLE } from "../user/user.interface";

// favourite.router.ts
const router = Router()
router.route("/:type").get(checkAuth(USER_ROLE.USER), favouriteController.getSelected)
router.route("/bookmark/:id").post(checkAuth(USER_ROLE.USER), favouriteController.bookmarkContent)
router.route("/favourite/:id").post(checkAuth(USER_ROLE.USER), favouriteController.createFavourite)

router.route("/:id")
    .delete(checkAuth(USER_ROLE.USER), favouriteController.deleteChoice)




export const favouriteRouter = router