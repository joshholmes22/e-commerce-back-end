const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [
        // be sure to include its associated Product data
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!tagData) {
      return res.status(500).json({ message: "Error, tags not found" });
    } else {
      return res.json(tagData);
    }
  } catch (error) {
    console.log(`Error - Failed to update category | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const { id } = req.params;
    const tagData = await Tag.findByPk(id, {
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (!tagData) {
      return res.status(500).json({ message: "Error, tags not found" });
    } else {
      return res.json(tagData);
    }
  } catch (error) {
    console.log(`Error - Failed to update category | ${error.message}`);
    return res.status(500).json(error);
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const { tagName } = req.body;
    await Tag.create(req.body);
    return res.json(tagName);
  } catch (error) {
    console.log(`Error - Failed to create category | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
