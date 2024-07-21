module.exports = async (req, res) => {
    // Your logic for handling deauthorization
    console.log("Deauthorize request received");
    // Example: Clean up user data from your database
    res.status(200).json({ success: true });
};
