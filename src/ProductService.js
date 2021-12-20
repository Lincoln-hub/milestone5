import axios from 'axios'


const base_url = "http://localhost:8080/products";

const deleteProduct = "http://localhost:8080/delete/";

class ProductService
{
    getProducts()
    { 
        return axios.get(base_url);   
    }
    deleteProd(id)
    {
        return axios.delete(deleteProduct+id);
    }
}

export default new ProductService();