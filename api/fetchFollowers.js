const axios = require('axios');

module.exports = async (req, res) => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    try {
        const response = await axios.get(`https://graph.instagram.com/${userId}?fields=followers_count&access_token=${accessToken}`);
        const followersCount = response.data.followers_count;
        console.log("Follower count from API:", followersCount); // Logging the fetched follower count
        res.status(200).json({ followersCount });
    } catch (error) {
        console.error('Error fetching follower count:', error);
        res.status(500).json({ error: 'Failed to fetch follower count' });
    }
};
