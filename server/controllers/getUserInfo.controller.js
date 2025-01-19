import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

// Controller to get user info based on the JWT token
const getUserInfoController = async (req, res) => {
    try {
        // Use the decoded user data (user.id and user.email)
        const userData = await UserModel.findById(req.user.id).select("-password");

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User data retrieved successfully",
            data: {
                id: userData._id,
                email: userData.email,
                name: userData.name,
                isAdmin : userData.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export default getUserInfoController;