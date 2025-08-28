// API CACHING:
export function getIngredientData(baseURL) {
  const cache = {};

  return async function getData(endpoint, item) {
    const url = `${baseURL}${endpoint}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Fetching data for ${item} failed. ${response.status}`);
      }

      const data = await response.json();
      console.log(`The fetched and converted Data is:`, data);

      return data;
    } catch (error) {
      console.error(`Unexpected fetch Error:`, error.message);

      return {
        fetchError: error.message,
      };
    }
  };
}
