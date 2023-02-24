const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product,
      attributes: ['product_name', 'price', 'stock']  ,    
      }]
    });
    if (!categoryData) {
      res.status(404).json({message: 'Category with this id not found'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({message: err.message});
  }

});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.statusCode(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {where: {id: req.params.id}});
    if (!categoryData) {
      res.status(404).json({ message: 'Category with this id not found'});
      return;
    } 
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy ({
      where: {id: req.params.id}
    });
    if (!categoryData) {
      res.status(404).json({message: 'Category with this id not found'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;