import { Router } from "express";
import userRouter from "./user.route.js";
import mediaRouter from "./media.route.js";
import reviewRouter from "./review.route.js";
import personRouter from "./person.route.js";

const router = Router();

// User routes
router.use("/user", userRouter);

// Media routes
router.use("/:mediaType", mediaRouter);

// Review routes
router.use("/reviews", reviewRouter);

// Celebrity Person routes
router.use("/person", personRouter);

export default router;
