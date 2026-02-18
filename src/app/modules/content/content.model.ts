import { model, Schema } from "mongoose";
import { IComment, IContent } from "./content.interface";

// content.model.ts
const categorySchema = new Schema<IContent>({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    },
    viewCount: {
        type: Number,
        default: 0
    },
    bookmarks: {
        type: [String],
        default: []
    },
}, {
    timestamps: true,
    versionKey: false
})


export const Content = model<IContent>('Content', categorySchema)




// comment.model.ts
const commentSchema = new Schema<IComment>({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _contentId: {
        type: Schema.Types.ObjectId,
        ref: 'Content'
    },
    comment: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})


export const Comment = model<IComment>('Comment', commentSchema)
