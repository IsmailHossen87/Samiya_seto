// favourite.controller.ts
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { JwtPayload } from "jsonwebtoken"
import { favouriteService } from "./favourite.service"
import { CategoryModel } from "../category/category.model"



// user.controller.ts
const createFavourite = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload

    const result = await favouriteService.createFavourite(user.userId, req.params.id)

    res.status(200).json({
        success: true,
        message: "Category created successfully",
        data: result
    })
})


const bookmarkContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload
    const result = await favouriteService.bookmarkContent(user.userId, req.params.id)
    res.status(200).json({
        success: true,
        message: "Content bookmarked successfully",
        data: result
    })
})

// DELETE
const deleteChoice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload

    const result = await favouriteService.deleteChoice(user.userId, req.params.id as string, req.query)
    res.status(200).json({
        success: true,
        message: "Choice deleted successfully",
        data: result
    })
})

const getSelected = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload
    console.log("Hellow Bangladesh")
    const result = await favouriteService.getSelected(user.userId, req.params.type as string)
    res.status(200).json({
        success: true,
        message: "Selected items fetched successfully",
        data: result
    })
})
export const favouriteController = {
    createFavourite,
    bookmarkContent,
    deleteChoice,
    getSelected
}