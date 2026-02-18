import unlinkFile from "../../shared/unLinkFile"
import { QueryBuilder } from "../../utils/QueryBuilder"
import { Favourite } from "../favourite/favourite.model"
import { USER_ROLE } from "../user/user.interface"
import { UserModel } from "../user/user.model"
import { CategoryModel } from "./category.model"

// category.service.ts
const createCategory = async (userId: string, payload: any) => {
    const userInfo = await UserModel.findById(userId)
    if (!userInfo) throw new Error("User not found")
    if (userInfo.role !== USER_ROLE.ADMIN) throw new Error("You are not authorized to create category")

    const result = await CategoryModel.create({ ...payload, _userId: userId })
    return result
}


// update
const updateCategory = async (userId: string, id: string, payload: any) => {
    const userInfo = await UserModel.findById(userId)
    if (!userInfo) throw new Error("User not found")

    const categoryInfo = await CategoryModel.findById(id)
    if (!categoryInfo) throw new Error("Category not found")
    if (userInfo.role !== USER_ROLE.ADMIN) throw new Error("You are not authorized to update category")

    if (payload?.image && categoryInfo.image) {
        unlinkFile(categoryInfo.image)
    }

    const result = await CategoryModel.findByIdAndUpdate(id, payload, { new: true })


    return result
}

// single
const singleCategory = async (id: string) => {
    const result = await CategoryModel.findById(id)
    return result
}

// get all
const getAllCategories = async (query: any, userId?: string) => {
    const queryBuilder = new QueryBuilder(CategoryModel.find().lean(), query)
        .search(['name'])
        .filter()
        .sort()
        .fields()
        .paginate();

    const [meta, data] = await Promise.all([
        queryBuilder.getMeta(),
        queryBuilder.build()
    ]);

    // ✅ Optional: mark user's favourites if userId provided
    if (userId) {
        const favourites = await Favourite.find({ _userId: userId, _categoryId: { $exists: true } })
            .select('_categoryId')
            .lean();
        const favIds = favourites.map(f => f._categoryId.toString());
        data.forEach(cat => { cat.isFavourite = favIds.includes(cat._id.toString()) });
    }

    return { meta, data };
};


export const categoryService = {
    createCategory,
    updateCategory,
    singleCategory,
    getAllCategories
}