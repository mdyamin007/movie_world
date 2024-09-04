/**
 * User Schema for MongoDB using Mongoose
 *
 * Represents a user in the system with the following fields:
 *
 * @property {String} username - The unique username of the user. Required and must be unique.
 * @property {String} fullName - The full name of the user. Required.
 * @property {String} password - The user's password. Required and hidden from queries.
 * @property {String} salt - The salt used for hashing the user's password. Required and hidden from queries.
 *
 * @constant {Object} userSchema - The Mongoose schema definition for a user.
 */

import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  modelOptions
);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.password === hash;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
