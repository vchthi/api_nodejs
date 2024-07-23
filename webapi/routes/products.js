var express = require("express");
var router = express.Router();
const upload = require("../helper/upload");
const checktoken = require("../helper/checktoken");
const productController = require("../mongo/product.controller");





router.post("/", async (req, res, next) => {
  try {
    const { name, image, price_1, price_2, mota_1, mota_2, category } = req.body;
    const product = await productController.insert({ name, image, price_1, price_2, mota_1, mota_2, category });
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



/* GET home page. */
// router.get("/detail/:spId", async (req, res) => {
//   try {
//     const spId = req.params.spId;
//     const sp = await productController.getProductById(spId);
//     res.render("detail", { sp });
//   } catch (error) {
//     console.log("Lỗi lấy thông tin sản phẩm", error);
//     return res.status(500).json({ mess: error });
//   }
// });

// Tuyến đường để hiển thị tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const pros = await productController.getpros();
    return res.status(200).json(pros);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả sản phẩm:", error);
    res.status(500).json({ message: error });
  }
});


// Tuyến đường để hiển thị sản phẩm hot
router.get("/hotpro", async (req, res) => {
  try {
    const hotProducts = await productController.getHotProduct();
    return res.status(200).json(hotProducts);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm hot:", error);
    res.status(500).json({ message: error });
  }
});

// Tuyến đường để hiển thị sản phẩm giảm giá
router.get("/sale", async (req, res) => {
  try {
    const saleProducts = await productController.getSaleProduct();
    return res.status(200).json(saleProducts);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm giảm giá:", error);
    res.status(500).json({ message: error });
  }
});
// Tuyến đường để hiển thị sản phẩm bán chạy
router.get("/bestseller", async (req, res) => {
  try {
    const bestSeller = await productController.getBestSeller();
    return res.status(200).json(bestSeller);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm hot:", error);
    res.status(500).json({ message: error });
  }
});

// Tuyến đường để hiển thị sản phẩm mới
router.get("/new", async (req, res) => {
  try {
    const newProducts = await productController.getNewProduct();
    return res.status(200).json({ newProducts });
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm mới:", error);
    res.status(500).json({ message: error });
  }
});

// Tuyến đường để hiển thị sản phẩm theo danh mục tiểu thuyết
router.get("/tieuthuyet", async (req, res) => {
  try {
    const tieuthuyet = await productController.getByCategory(
      "65fb01f45855e62fea735f8e"
    );
    return res.status(200).json({ tieuthuyet });
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm tiểu thuyết:", error);
    res.status(500).json({ message: error });
  }
});

// Tuyến đường để hiển thị sản phẩm theo danh mục văn học
router.get("/vanhoc", async (req, res) => {
  try {
    const vanhoc = await productController.getByCategory(
      "65fb017b5855e62fea735f8c"
    );
    return res.status(200).json(vanhoc);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm văn học:", error);
    res.status(500).json({ message: error });
  }
});



// Route để lấy danh sách sản phẩm mới
router.get("/newpro", async (req, res) => {
  try {
    const products = await productController.getNew();
    res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm mới:", error.message);
    res.status(500).json({ message: error });
  }
});


// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await productController.getAll();
    return res.status(200).json({ Products: products });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: error });
  }
});

// Lấy sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productController.getProductById(productId);
    return res.status(200).json( product );
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo ID:", error.message);
    res.status(500).json({ message: error });
  }
});

// Cập nhật sản phẩm theo id
// router.put("/update/:id",upload.single('image'), async (req, res) => {
//   try {
//     const {id} = req.params;
//     const body = req.body;
//     if (req.file) {
//         body.img = req.file.originalname

//     }else{
//         delete body.img
//     }
//     const updatedProduct = await productController.updateById(id, body);
//     return res.status(200).json(updatedProduct );
//   } catch (error) {
//     console.error("Lỗi cập nhật sản phẩm theo id:", error.message);
//     res.status(500).json({ message: error });
//   }
// });



router.put("/:id", async (req, res, next) => {
  try {
    let {id}=req.params;
    let { name, image, price_1, price_2, mota_1, mota_2, category } = req.body;
    const product = await productController.updateById(id, { name, image, price_1, price_2, mota_1, mota_2, category });
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const proDel = await productController.remove(id);
    return res.status(200).json({ ProductDelete: proDel });
  } catch (error) {
    console.log("Lỗi xóa sản phẩm theo id ", error);
    return res.status(500).json({ mess: error });
  }
});

//xem chi tiết
//http://localhost:3000/products/detail/id
router.get("/detail/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const sp = await productController.getProductDetail(productId);
    return res.status(200).json(sp);
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    return res.status(500).json({ mess: error });
  }
});


//lấy danh sách sản phẩm theo mã danh mục
//http://localhost:3000/products/category/id
router.get("/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await productController.getByCategory(categoryId);
    return res.status(200).json( products );
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo mã danh mục:", error.message);
    res.status(500).json({ message: error });
  }
});


// tìm sản phẩm
//http://localhost:3000/products/search/name/
router.get("/search/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const product = await productController.getByKey(key, value);
    return res.status(200).json({ Product: product });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo key:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng
//http://localhost:3000/products/giatangdan
router.get("/giatangdan", async (req, res) => {
  try {
    const product = await productController.getGiaTangDan();
    res.status(200).json(product);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm liên quan với sản phẩm hiển thị ở trang chi tiết
//http://localhost:3000/products/lienquan/
router.get("/lienquan/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const sanPhamLienQuan = await productController.getProLienQuan(productId);
    res.status(200).json({ sanPhamLienQuan });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm liên quan:", error.message);
    res.status(500).json({ message: error });
  }
});

// Tìm và xóa sản phẩm theo điều kiện tên
//http://localhost:3000/products/timvaxoa/
router.delete("/timvaxoa/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await productController.timvaxoa(name);
    return res.status(200).json({ protimvaxoa: result });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm không thành công:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

//Tìm và xóa sản phẩm theo điều kiện giá
//http://localhost:3000/products/delete-by-price/:price
router.delete("/delete-by-price/:price", async (req, res) => {
  try {
    const price = parseFloat(req.params.price);
    const deletedProducts = await productController.deleteByPrice(price);
    return res.status(200).json({ DeletedProducts: deletedProducts });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo điều kiện giá:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm theo trang và giới hạn số lượng
//http://localhost:3000/products/products?limit=1?page=1
router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const proPage = await productController.getProPage(page, limit);
    return res.status(200).json({ proPage: proPage });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo trang:", error.message);
    res.status(500).json({ message: error });
  }
});


router.get('/related/:id/related', async (req, res) => {
  try {
      const { id } = req.params;
      const relatedProducts = await productController.getRelatedProductsByProductId(id);
      return res.status(200).json(relatedProducts);
  } catch (error) {
      console.log('Lỗi lấy sản phẩm liên quan theo danh mục', error);
      return res.status(500).json({ message: error.message });
  }
});


router.get("/search/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const products = await productController.findByName(name);
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


