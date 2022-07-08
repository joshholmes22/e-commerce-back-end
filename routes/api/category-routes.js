const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });

    if (!categoryData) {
      return res.status(500).json({ message: "Error, category not found" });
    } else {
      return res.json(categoryData);
    }
  } catch (error) {
    console.log(`Error - Failed to get all categories | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const { id } = req.params;
    const categoryData = await Category.findByPk(id, {
      include: {
        model: Product,
        // be sure to include its associated Products
        attributes: ["product_name", "price", "stock"],
      },
    });
    if (!categoryData) {
      return res.status(500).json({ message: "Error, category not found" });
    } else {
      return res.json(categoryData);
    }
  } catch (error) {
    console.log(`Error - Failed to get category | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const { categoryName } = req.body;
    await Category.create(req.body);
    return res.json(categoryName);
  } catch (error) {
    console.log(`Error - Failed to create category | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    await Category.update({ category_name }, { where: { id } });

    return res.json({ message: "Category Updated" });
  } catch (error) {
    console.log(`Error - Failed to update category | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const { id } = req.params;

    await Category.destroy({ where: { id } });
    return res.status(200).json({ message: "Category Deleted" });
  } catch (error) {
    console.log(`Error - Failed to delete category | ${error.message}`);
    return res.status(500).json(error);
  }
});

module.exports = router;
