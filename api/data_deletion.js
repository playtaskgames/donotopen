module.exports = async (req, res) => {
    // Your logic for handling data deletion requests
    console.log("Data deletion request received ");
    // Example: Delete user data from your database
    res.status(200).json({ success: true });
};
