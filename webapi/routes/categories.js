var express = require("express");
var router = express.Router();
const categoryController = require("../mongo/category.controller");



//http:/localhost:3000/categories

// http:/localhost:3000/categories/
router.get("/", async (req, res) => {
  try {
    const categories = await categoryController.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.log("Lỗi lấy danh sách danh mục", error);
    return res.status(500).json({ mess: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryController.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.log("Lỗi lấy danh mục theo ID", error);
    return res.status(500).json({ mess: error });
  }
});
//thêm mới danh mục
//http:/localhost:3000/categories/add
router.post("/", async (req, res) => {
  try {
    const body = req.body
    const cateNew = await categoryController.addCategory(body);
    return res.status(200).json(cateNew);
  } catch (error) {
    console.log("Lỗi thêm danh mục", error);
    return res.status(500).json({ mess: error });
  }
});

//xóa danh mục
//http://localhost:3000/categories/delete/
router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const cateDel = await categoryController.removeCategory(id); // Sửa tên hàm gọi đúng
      return res.status(200).json({ CategoryDelete: cateDel });
  } catch (error) {
      console.log('Lỗi xóa danh mục theo id ', error);
      return res.status(500).json({ error: 'Lỗi xóa danh mục theo id' });
  }
});

// Cập nhật danh mục theo id
router.put('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const body = req.body;
      const cateUpdate = await categoryController.updateCategory(id, body);
      return res.status(200).json({ CategoryUpdate: cateUpdate });
  } catch (error) {
      console.log('Lỗi cập nhật danh mục theo id ', error);
      return res.status(500).json({ error: 'Lỗi cập nhật danh mục theo id' });
  }
});



// Tìm danh mục
// http://localhost:3000/categories/search/name/categoryName
router.get("/search/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const category = await categoryController.getByKey(key, value);
    return res.status(200).json({ Category: category });
  } catch (error) {
    console.error("Lỗi lấy danh mục theo key:", error.message);
    res.status(500).json({ message: error });
  }
});


module.exports = router;


