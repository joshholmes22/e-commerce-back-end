const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
        // be sure to include its associated Products
      include: [{model: Product, attributes: ["product_name", "price", "stock"]}]
    });

    if (categoryData) {
      return res.json(categoryData)
    }
  }
  catch (error) {
    console.log(`Error - Failed to get all categories | ${error.message}`);
    return res.status(500).json(error)
  }

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
