import axios from 'axios';
import Config from './Config/Config';
const saveSitemap = async () => {
   try {
     const response = await axios.get(`${Config.API_URL}/sitemap.xml`);
     const xmlContent = response.data;
     // Write the content to sitemap.xml file
     const blob = new Blob([xmlContent], { type: 'text/xml' });
     const url = window.URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'sitemap.xml';
     document.body.appendChild(a);
     a.click();
     window.URL.revokeObjectURL(url);
     document.body.removeChild(a);
     console.log('file is save')
   } catch (error) {
     console.error('Error saving sitemap:', error);
   }
 };
 

export default saveSitemap;