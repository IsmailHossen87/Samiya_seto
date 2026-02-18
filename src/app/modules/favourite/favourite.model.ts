// favourite.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFavourite extends Document {
    _userId: Types.ObjectId;
    _contentId: Types.ObjectId;
    _categoryId: Types.ObjectId;
    createdAt: Date;
}

const FavouriteSchema: Schema = new Schema(
    {
        _userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        _contentId: {
            type: Schema.Types.ObjectId,
            ref: "Content",
        },
        _categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        }
    },
    {
        timestamps: true  // automatically adds createdAt and updatedAt
    }
);

// prevent same user favouriting same content multiple times
FavouriteSchema.index({ _userId: 1, _contentId: 1, _categoryId: 1 }, { unique: true });

export const Favourite = mongoose.model<IFavourite>("Favourite", FavouriteSchema);
