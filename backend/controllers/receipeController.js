import { Receipe } from "../models/receipeModel.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from 'cloudinary';

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
