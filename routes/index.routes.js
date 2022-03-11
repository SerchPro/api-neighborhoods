const router = require("express").Router();
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const reviewRoutes = require("./review.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/review", reviewRoutes);
router.use("/user", userRoutes)
router.use("/category", categoryRoutes)



module.exports = router;