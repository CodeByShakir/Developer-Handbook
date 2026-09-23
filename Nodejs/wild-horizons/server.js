import http from "node:http";
import { getDataFromDatabase } from "./database/db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import { getDataByPathParams } from "./utils/getDataByPathParams.js";
import { getDataByQueryParams } from "./utils/getDataByQueryParams.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const data = await getDataFromDatabase();
  const urlObject = new URL(req.url, `http://${req.headers.host}`);
  const queryObject = Object.fromEntries(urlObject.searchParams);

  if (urlObject.pathname === "/api" && req.method === "GET") {
    const filteredData = getDataByQueryParams(data, queryObject);
    sendJSONResponse(res, 200, filteredData);
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    const countryName = req.url.split("/").pop();
    const countryData = getDataByPathParams(data, "country", countryName);
    sendJSONResponse(res, 200, countryData);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continentName = req.url.split("/").pop();
    const continentData = getDataByPathParams(data, "continent", continentName);
    sendJSONResponse(res, 200, continentData);
  } else {
    sendJSONResponse(res, 404, { message: "Not Found" });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
