const router = require("express").Router();
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const reviewRoutes = require("./review.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const uploadRoutes = require("./upload.routes");
const neighborhoodRoutes = require("./neighborhood.routes");
const addressRoutes =  require("./address.routes")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/review", reviewRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/upload", uploadRoutes);
router.use("/neighborhood", neighborhoodRoutes);
router.use("/address", addressRoutes)



module.exports = router;