/**
 * Favorite Schema for MongoDB using Mongoose
 *
 * Represents a user's favorite media item with the following fields:
 *
 * @property {ObjectId} user - The ID of the user who marked the media as a favorite. References the "User" model. Required.
 * @property {String} mediaType - The type of media being marked as a favorite. Must be either "tv" or "movie". Required.
 * @property {String} mediaId - The ID of the media being marked as a favorite. Required.
 * @property {String} mediaTitle - The title of the media being marked as a favorite. Required.
 * @property {String} mediaPoster - The URL of the media's poster image. Required.
 * @property {Number} mediaRate - The rating assigned to the media by the user. Required.
 *
 * @constant {Schema} favoriteSchema - The Mongoose schema definition for a favorite.
 */

import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Favorite",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        required: true,
      },
      mediaId: {
        type: String,
        required: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
      mediaRate: {
        type: Number,
        required: true,
      },
    },
    modelOptions
  )
);
