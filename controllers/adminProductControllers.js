import product from "../Models/products.js";

export const adminAddProduct = async (req, res) => {
    const result = req.body;
    console.log('Admin add product:', result);
  
    if (!result) {
      return res.status(403).json({ message: "Missing required fields" });
    }
  
    const newProduct = new product({
      title: result.title,
      description: result.description,
      price: result.price,
      category: result.category,
      quantity: result.quantity,
      images: req.cloudinaryImageUrls || [], // <-- store multiple images
    });
  
    await newProduct.save();
  
    return res.status(200).json({ message: 'Product added successfully' });
  };
  
   