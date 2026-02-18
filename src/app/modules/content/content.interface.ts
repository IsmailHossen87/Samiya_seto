import { Types } from "mongoose";

// content.interface.ts
export interface IContent {
    _id: string;
    _userId: Types.ObjectId;
    _categoryId: Types.ObjectId;

    title: string;
    description: string;
    location: string,
    tag: string;
    image: string;
    likeCount: number;
    commentCount: number;
    comments: IComment[];
    bookmarks: string[];
    viewCount: number;
    isBookMark?: boolean;
}

export interface IComment {
    _id: string;
    _userId: Types.ObjectId;
    _contentId: Types.ObjectId;
    comment: string;
}