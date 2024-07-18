import categoryModel from '../models/category'


const categoryName =async (req, res) => {
    try {
      const categories = await categoryModel.find({}, 'category'); 
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports =categoryName;
