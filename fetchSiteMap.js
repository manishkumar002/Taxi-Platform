const fs = require('fs');
const path = require('path');
const axios = require('axios');
// const { default: Config } = require('./src/Config/Config');

const fetchSitemap = async () => {
  try {
    const response = await axios.get('http://localhost:3001/sitemap.xml');
    const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, response.data);
    console.log('Sitemap saved successfully.');
  } catch (error) {
    console.error('Error fetching the sitemap:', error);
  }
};

fetchSitemap();