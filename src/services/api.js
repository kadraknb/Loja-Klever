export async function getProducts() {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=MLB1144`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const end = `https://api.mercadolibre.com/sites/MLB/search?category=MLB1144&q=${query}`;
    const response = await fetch(end);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

// this fetch returns a specific category of the API provided by Mercado Livre 

export async function getProductItemByID(PRODUCT_ID) {
  try {
    const endpoint = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
    const response = await fetch(endpoint);
    const results = await response.json();
    return results;
  } catch (err) {
    console.log(err);
  }
}

export async function multiGetProductItemByID(PRODUCT_ID) {
  try {
    const endpoint = `https://api.mercadolibre.com/items?ids=${PRODUCT_ID}`;
    const response = await fetch(endpoint);
    const results = await response.json();
    return results;
  } catch (err) {
    console.log(err);
  }
}