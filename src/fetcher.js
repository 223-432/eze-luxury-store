const BASE_URL = "/db.json";

export const fetcher = async (url) => {
    let responseObject = { errorMessage: "", data: [] };

    try {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }

        const responseData = await response.json();

        let data = responseData;

        if (url === "/categories") {
            data = responseData.categories;
        }

        if (url === "/products") {
            data = responseData.products;
        }

        if (url.startsWith("/products?categoryId=")) {
            const categoryId = Number(
                new URLSearchParams(url.split("?")[1]).get("categoryId")
            );

            data = responseData.products.filter(
                product => product.categoryId === categoryId
            );
        }

        if (url.startsWith("/products/")) {
            const id = Number(url.split("/products/")[1]);

            data = responseData.products.find(
                product => product.id === id
            );

            if (!data) {
                throw new Error("Product not found");
            }
        }

        responseObject.data = data;
        return responseObject;

    } catch (err) {
        responseObject.errorMessage = err.message;
        return responseObject;
    }
};

export const getCategories = () => {
    return fetcher("/categories");
};

export const getProducts = id => {
    return fetcher("/products?categoryId=" + id);
};

export const getProductById = id => {
    return fetcher("/products/" + id);
};

export const getProductsByQuery = query => {
    return fetcher("/products");
};