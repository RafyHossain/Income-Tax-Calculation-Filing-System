const UserModel = require("../models/UserModel");

class UserController {
    static async getUserByEmail(req, res) {
        try {
            const email = req.params.email;
            const user = await UserModel.findByEmail(email);
            res.json({
                success: true,
                data: user
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    static async getUserByPhone(req,res){
        try{
            const phone=req.params.phone;
        const user=await UserModel.findByphone(phone);
        res.json({
            success:true,
            data:user,
        })
        } catch (error){
            res.status(500).json({
                success: false,
                message: error.message
            });

        }


    }

}

module.exports = UserController;