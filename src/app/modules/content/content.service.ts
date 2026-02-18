// content.service.ts
import AppError from "../../errorHalper.ts/AppError"
import { QueryBuilder } from "../../utils/QueryBuilder"
import { Favourite } from "../favourite/favourite.model"
import { USER_ROLE } from "../user/user.interface"
import { UserModel } from "../user/user.model"
import { Content } from "./content.model"
import httpStatus from "http-status-codes"

// category.service.ts
const createContent = async (userId: string, payload: any) => {
    const userInfo = await UserModel.findById(userId)
    if (!userInfo) throw new Error("User not found")
    if (userInfo.role !== USER_ROLE.USER) throw new Error("You are not authorized to create category")

    const result = await Content.create({ ...payload, _userId: userId })
    return result
}

// get all content
const getAllContent = async (query: any, userId?: string) => {
    const { category, sort, ...restQuery } = query;
    const mongoQuery: any = {};

    if (category) {
        const categoryIds = category.split(",")
        mongoQuery._categoryId = { $in: categoryIds };
    }


    let setOptions = {};
    if (sort === "new") {
        setOptions = { createdAt: -1 };
    } else if (sort === "old") {
        setOptions = { viewCount: 1 };
    } else if (sort === "popular") {
        setOptions = { likeCount: -1 };
    }

    const queryBuilder = new QueryBuilder(
        Content.find(mongoQuery)
            .populate("_categoryId", "name image")
            .populate("_userId", "name image")
            .lean().sort(setOptions),
        restQuery
    )
        .search(["title", "description", "location"])
        .filter()
        .sort()
        .paginate();

    const [meta, data] = await Promise.all([
        queryBuilder.getMeta(),
        queryBuilder.build()
    ]);

    if (data.length <= 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No content found");
    }

    const exposeData = data.map((item: any) => {
        const { _userId, _categoryId, ...rest } = item;

        return {
            ...rest,
            userName: _userId?.name,
            userImage: _userId?.image,
            categoryName: _categoryId?.name,
            categoryImage: _categoryId?.image,
        };
    });
    // Check BookMark
    if (userId) {
        const checkBookMark = await Favourite.find({ _userId: userId, _contentId: { $exists: true } }).select("_contentId")
        const bookMarkIds = checkBookMark.map((item: any) => item._contentId.toString());

        exposeData.forEach((a) => {
            a.isBookMark = bookMarkIds.includes(a._id.toString())
        })
    }

    return { meta, data: exposeData };
};


export const contentService = {
    createContent,
    getAllContent
}
