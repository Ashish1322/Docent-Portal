import { BASE_URL } from "../../../config.js";

const fetchAllPersons = (role, token, query) => {
  let url;
  if (role == "patient") {
    url = `${BASE_URL}/patient/all-doctors`;
  } else {
    url = `${BASE_URL}/doctor/all-patients`;
  }

  // Parse each query param and inject in url, use for in loop as query is object
  let queryString = "";
  for (let key in query) {
    queryString += `${key}=${query[key]}&`;
  }

  if (queryString.length > 0) {
    url += `?${queryString}`;
  }

  let response = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
};

const fetchAllMessages = (receiverId, token) => {
  let response = fetch(`${BASE_URL}/auth/messages?receiverId=${receiverId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
};
export { fetchAllPersons, fetchAllMessages };
