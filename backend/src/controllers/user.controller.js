const getAllUsers = (req, res) => {

    res.json({
        success: true,
        message: "All Users",
        data: []
    });

};

module.exports = {
    getAllUsers
};