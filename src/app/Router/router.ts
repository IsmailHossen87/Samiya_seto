import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { authRouter } from "../modules/auth/auth.router";
import { categoryRouter } from "../modules/category/category.router";
import { ContentRouter } from "../modules/content/content.router";
import { favouriteRouter } from "../modules/favourite/favourite.router";

const router = Router();


const apiRoutes = [
    {
        path: "/user",
        router: userRouter
    },
    {
        path: "/auth",
        router: authRouter
    },
    {
        path: "/category",
        router: categoryRouter
    },
    {
        path: "/content",
        router: ContentRouter
    },
    {
        path: "/user-content",
        router: favouriteRouter
    }
]




apiRoutes.forEach((route) => {
    router.use(route.path, route.router)
})

export default router;