export function getDataByPathParams(data, locationType, locationName) {
  return data.filter(
    (item) => item[locationType].toLowerCase() === locationName.toLowerCase(),
  );
}
