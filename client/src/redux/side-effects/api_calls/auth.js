import { BASE_URL } from "../../../config.js";

const signup = (content) => {
  let response = fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
  return response;
};

const login = (email, password) => {
  let response = fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

const updateProfile = (phone, about, street, city, state, zip, token) => {
  let response = fetch(`${BASE_URL}/auth/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ phone, about, state, street, city, zip }),
  });
  return response;
};

const updatePassword = (newPassword, currentPassword, token) => {
  let response = fetch(`${BASE_URL}/auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ newPassword, currentPassword }),
  });
  return response;
};
export { signup, login, updateProfile, updatePassword };
