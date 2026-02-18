import { CategoryModel } from "../category/category.model"
import { Content } from "../content/content.model"
import { USER_ROLE } from "../user/user.interface"
import { UserModel } from "../user/user.model"
import { Favourite } from "./favourite.model"

// favourite.service.ts
const createFavourite = async (userId: string, categoryId: any) => {
    const userInfo = await UserModel.findById(userId)
    if (!userInfo) throw new Error("User not found")
    if (userInfo.role !== USER_ROLE.USER) throw new Error("You are not authorized to create category")
    const categoryFind = await CategoryModel.findById(categoryId)
    if (!categoryFind) throw new Error("Category not found")

    const isAlreadyFavourite = await Favourite.findOne({ _userId: userId, _categoryId: categoryId })
    if (isAlreadyFavourite) throw new Error("Category already favourited")

    const result = await Favourite.create({ _userId: userId, _categoryId: categoryId })
    return result
}

const bookmarkContent = async (userId: string, contentId: any) => {
    const userInfo = await UserModel.findById(userId)
    if (!userInfo) throw new Error("User not found")
    if (userInfo.role !== USER_ROLE.USER) throw new Error("You are not authorized to create category")

    const contentFind = await Content.findById(contentId)
    if (!contentFind) throw new Error("Content not found")

    const isAlreadyBookmarked = await Favourite.findOne({ _userId: userId, _contentId: contentId })
    if (isAlreadyBookmarked) throw new Error("Content already bookmarked")

    const result = await Favourite.create({ _userId: userId, _contentId: contentId })
    return result
}

const deleteChoice = async (userId: string, id: string, query: any) => {

    const userInfo = await UserModel.findById(userId)
    if (!userInfo) throw new Error("User not found")
    if (userInfo.role !== USER_ROLE.USER) throw new Error("You are not authorized to create category")

    let result;

    if (query.type === "category") {
        const categoryFind = await CategoryModel.findById(id)
        if (!categoryFind) throw new Error("Category not found")
        result = await Favourite.deleteOne({ _categoryId: id, _userId: userId })
    }
    if (query.type === "content") {
        const contentFind = await Content.findById(id)
        if (!contentFind) throw new Error("Content not found")
        result = await Favourite.deleteOne({ _contentId: id, _userId: userId })
    }
    return result
}

const getSelected = async (userId: string, type: string) => {
    const userInfo = await UserModel.findById(userId)
    if (!userInfo) throw new Error("User not found")
    if (userInfo.role !== USER_ROLE.USER) throw new Error("You are not authorized to create category")

    let result;
    if (type === "category") {
        result = await Favourite.find({ _userId: userId, _categoryId: { $exists: true } }).populate("_categoryId")
    }
    if (type === "content") {
        result = await Favourite.find({ _userId: userId, _contentId: { $exists: true } }).populate("_contentId")
    }
    return result
}

export const favouriteService = {
    createFavourite,
    bookmarkContent,
    deleteChoice,
    getSelected
}