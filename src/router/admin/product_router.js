const { Router } = require("express");
const { verifyAdmin } = require("../../middleware/verify_user");
const multer = require("../../middleware/multer");
const { addProduct, deleteProduct, getProduct, updateProduct } = require("../../controller/admin/product_controller");

const router = Router();
router.post("/", verifyAdmin, multer.fields([
    { name: "image", maxCount: 4 },
    { name: "thumbnail", maxCount: 1 }]),
    addProduct
);

router.get("/", getProduct);
router.put("/:id", verifyAdmin, multer.fields([
    { name: "image", maxCount: 4 },
    { name: "thumbnail", maxCount: 1 }]),
    updateProduct
);
router.delete("/", verifyAdmin, deleteProduct);

module.exports = router;