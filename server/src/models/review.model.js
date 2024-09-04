/**
 * Review Schema for MongoDB using Mongoose
 *
 * Represents a review written by a user for a media item (movie or TV show) with the following fields:
 *
 * @property {String} content - The content of the review. Required.
 * @property {String} mediaType - The type of media being reviewed. Must be either "tv" or "movie". Required.
 * @property {String} mediaId - The ID of the media being reviewed. Required.
 * @property {String} mediaTitle - The title of the media being reviewed. Required.
 * @property {String} mediaPoster - The URL of the media's poster image. Required.
 *
 * @constant {Schema} reviewSchema - The Mongoose schema definition for a review.
 */

import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Review",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
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
    },
    modelOptions
  )
);
