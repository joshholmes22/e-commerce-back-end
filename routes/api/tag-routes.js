const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

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
      return res.status(500).json({ message: "Error, category not found" });
    } else {
      return res.json(tagData);
    }
  } catch (error) {
    console.log(`Error - Failed to update category | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
