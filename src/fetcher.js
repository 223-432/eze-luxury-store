const BASE_URL = "http://localhost:8080"

export const fetcher = async (url) => {
    let responseObject = {errorMessage: '', data: [] };

    try {
    const response = await fetch(BASE_URL + url);
    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`)
    }
    const responseData = await response.json();
    responseObject.errorMessage = '';
    responseObject.data = responseData;

    return responseObject
    }
    catch (err) {
        responseObject.errorMessage = err.message 
        return responseObject
    }

}


export const getCategories = () => {
    return fetcher('/categories');
}

export const getProducts = id => {
    return fetcher('/products?categoryId=' + id);
}

export const getProductById = id => {
    return fetcher('/products/' + id)
}

export const getProductsByQuery = query => {
    // Fetch all products to enable robust client-side case-sensitive exact matching
    return fetcher('/products');
}
