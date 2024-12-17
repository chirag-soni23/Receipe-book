import { Receipe } from "../models/receipeModel.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from 'cloudinary';

// Add Recipe
export const addReceipe = async (req, res) => {
    try {
        const { title, ingredients, instruction, category } = req.body;
        const file = req.file;

        if (!title || !ingredients || !instruction || !category) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (!file) {
            return res.status(400).json({ message: "Image file is required!" });
        }

        const fileUrl = getDataUri(file);
        const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

        // Create the recipe
        await Receipe.create({
            title,
            ingredients,
            instruction,
            category,
            image: {
                id: cloud.public_id,
                url: cloud.secure_url
            }
        });

        res.status(201).json({ message: "Recipe Created Successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Recipes
export const getAllReceipe = async (req, res) => {
    try {
        const receipes = await Receipe.find().sort({ createdAt: -1 });
        res.status(200).json(receipes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Single Recipe
export const getSingleReceipe = async (req, res) => {
    try {
        const receipe = await Receipe.findById(req.params.id);
        if (!receipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(receipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update Recipe
export const updateReceipe = async (req, res) => {
    try {
        const { title, ingredients, instruction, category } = req.body;
        const { id } = req.params;

        const receipe = await Receipe.findById(id);
        if (!receipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        let updatedImage = receipe.image;
        if (req.file) {
            await cloudinary.v2.uploader.destroy(receipe.image.id);
            const fileUrl = getDataUri(req.file);
            const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

            updatedImage = {
                id: cloud.public_id,
                url: cloud.secure_url
            };
        }

        // Update recipe
        receipe.title = title || receipe.title;
        receipe.ingredients = ingredients || receipe.ingredients;
        receipe.instruction = instruction || receipe.instruction;
        receipe.category = category || receipe.category;
        receipe.image = updatedImage;

        await receipe.save();

        res.status(200).json({ message: "Recipe updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Recipe
export const deleteReceipe = async (req, res) => {
    try {
        const { id } = req.params;

        const receipe = await Receipe.findById(id);
        if (!receipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        await cloudinary.v2.uploader.destroy(receipe.image.id);

        await Receipe.findByIdAndDelete(id);

        res.status(200).json({ message: "Recipe deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
