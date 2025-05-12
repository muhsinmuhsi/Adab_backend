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
  
   

  export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        price,
        category,
        quantity,
        images, // existing images array (as stringified JSON)
      } = req.body;
  
      // Prepare fields to update
      const updateFields = {
        title,
        description,
        price,
        category,
        quantity,
      };
  
      // Handle Images
      let finalImages = [];
  
      if (images) {
        // Parse the existing images JSON if it exists
        finalImages = JSON.parse(images);
      }
  
      if (req.cloudinaryImageUrls && req.cloudinaryImageUrls.length > 0) {
        // Add new uploaded images
        finalImages = finalImages.concat(req.cloudinaryImageUrls);
      }
  
      // Set final images array in updateFields
      updateFields.images = finalImages;
  
      // Find and update product
      const updatedProduct = await product.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  
    } catch (error) {
      console.error("Error updating product", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  


  export const deleteProduct=async(req,res,next)=>{
    const {id}=req.params
    try {
        const deleteProduct=await product.findByIdAndDelete(id)
        if(!deleteProduct){
            return res.status(404).json({message:"product not found"})
        }

        res.status(201).json({message:"product deleted ",})
    } catch (error) {
        return res.status(500).json({message:'internal server error'})
    }
}