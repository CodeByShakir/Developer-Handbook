export function getDataByQueryParams(data, queryParams) {
  const { continent, country, is_open_to_public } = queryParams;
  let filteredData = data;
  if (continent) {
    filteredData = filteredData.filter(
      (item) => item.continent.toLowerCase() === continent.toLowerCase(),
    );
  }
  if (country) {
    filteredData = filteredData.filter(
      (item) => item.country.toLowerCase() === country.toLowerCase(),
    );
  }
  if (is_open_to_public) {
    filteredData = filteredData.filter(
      (item) => item.is_open_to_public === JSON.parse(is_open_to_public),
    );
  }
  return filteredData;
}
