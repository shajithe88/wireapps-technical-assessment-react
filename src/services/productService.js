import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

const getProducts = async (categoryName) => {
    const cleanedCategoryName = categoryName?.replace(/%20/g, ' ');
    const response = await axios.get(`${BASE_URL}/products/category/${cleanedCategoryName}`);
    return response;
};

const getFlashProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response;
};

export default {
    getProducts,
    getFlashProducts
};
