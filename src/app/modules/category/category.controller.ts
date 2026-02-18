// category.controller.ts
import { NextFunction, Request, Response } from "express"

import catchAsync from "../../utils/catchAsync"
import { JwtPayload } from "jsonwebtoken"
import { categoryService } from "./category.service"


// user.controller.ts
const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.files && "image" in req.files && req.files.image) {
        req.body.image = `image/${req.files.image[0].filename}`
    }

    const user = req.user as JwtPayload
    const result = await categoryService.createCategory(user.userId, req.body)

    res.status(200).json({
        success: true,
        message: "Category created successfully",
        data: result
    })
})

// update
const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.files && "image" in req.files && req.files.image) {
        req.body.image = `image/${req.files.image[0].filename}`
    }

    const user = req.user as JwtPayload
    const result = await categoryService.updateCategory(user.userId, req.params.id as string, req.body)

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: result
    })
})


const singleCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryService.singleCategory(req.params.id as string)
    res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    const user = req.user as JwtPayload
    console.log("user", user)
    const result = await categoryService.getAllCategories(query, user?.userId)
    res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        meta: result.meta,
        data: result.data
    })
})

export const categoryController = {
    createCategory,
    updateCategory,
    singleCategory,
    getAllCategories
}