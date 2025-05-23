import product from "../Models/products.js";

export const viewProduct = async (req, res) => {
    try {
        const products = await product.find();
    
    if (products.length === 0) {
        res.status(404).json({message: 'unable to get products'});
        return; 
    }
    
    res.status(200).json({
        status: "success", 
        message: 'successfully fetched data',
        data: products
    });
    } catch (error) {
        res.status(500).json({message:'internal server error',error})
    }
    
  };



  export const productById = async (req, res) => {
    try {
        const productId = req.params.id;
        const products = await product.findById(productId);        
    
    if (!products) {
        res.status(404).json({
            error: 'not found',
            message: 'product not found'
        });
        return;
    }
    
     res.status(200).json(products);
    } catch (error) {
        console.log(error,'error');
        
        res.status(500).json({message:"internal server error",error})
    }
    
  };


  export const productByCategory = async (req, res) => {
    const { category } = req.params;
  
    const products = await product.find({
        $or: [
            { category: { $regex: new RegExp(category, 'i') } },
            { title: { $regex: new RegExp(category, 'i') } }
        ]
    });
  
    if (products.length === 0) {
        res.status(404).json({ message: "Item not found" });
        return;
    }
  
    res.status(200).json(products);
  };