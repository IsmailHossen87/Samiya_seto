import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

// category.model.ts
const categorySchema = new Schema<ICategory>({
    _userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ['active', 'hidden'], default: 'active' },
    isDeleted: { type: Boolean, default: false },
    postCount: { type: Number, default: 0 },
})

// categorySchema.pre("save", async function (next) {
//     const isExist = await CategoryModel.findOne({ name: this.name })
//     if (isExist) {
//         throw new Error("Category already exists")
//     }
//     next()
// })

categorySchema.pre("save", async function () {
    const isExist = await CategoryModel.findOne({
        name: this.name,
        _id: { $ne: this._id }
    })

    if (isExist) {
        throw new Error("Category already exists")
    }
})


export const CategoryModel = model<ICategory>('Category', categorySchema);