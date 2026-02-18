// content.controller.ts
// category.controller.ts
import { NextFunction, Request, Response } from "express"

import catchAsync from "../../utils/catchAsync"
import { JwtPayload } from "jsonwebtoken"
import { contentService } from "./content.service"



// user.controller.ts
const createContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.files && "image" in req.files && req.files.image) {
        req.body.image = `image/${req.files.image[0].filename}`
    }

    const user = req.user as JwtPayload
    const result = await contentService.createContent(user.userId, req.body)

    res.status(200).json({
        success: true,
        message: "Content created successfully",
        data: result
    })
})

const getAllContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    const user = req.user as JwtPayload
    const result = await contentService.getAllContent(query, user?.userId)

    res.status(200).json({
        success: true,
        message: "Content fetched successfully",
        meta: result.meta,
        data: result.data,

    })
})



export const contentController = {
    createContent,
    getAllContent
}