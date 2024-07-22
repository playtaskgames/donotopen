const puppeteer = require('puppeteer');

async function getFollowerCount(username) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(`https://www.instagram.com/sparkfieldgame/`, {
        waitUntil: 'networkidle2'
    });

    await page.waitForSelector('header section ul li span');

    const followerCount = await page.evaluate(() => {
        const followerElement = document.querySelector('header section ul li span');
        return followerElement.getAttribute('title') || followerElement.innerText;
    });

    await browser.close();
    return followerCount;
}

module.exports = async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const followerCount = await getFollowerCount(username);
        res.status(200).json({ followersCount: followerCount });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching follower count' });
    }
};
