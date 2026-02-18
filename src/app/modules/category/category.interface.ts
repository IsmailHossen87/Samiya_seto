import { Types } from "mongoose";

// category.interface.ts
export interface ICategory {
    _id: string;
    _userId: Types.ObjectId;
    name: string;
    image: string;
    status: 'active' | 'hidden';
    isDeleted: boolean
    postCount: number;
    isFavourite: boolean;
}