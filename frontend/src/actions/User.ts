import axios from "../libs/axios";

export function getUser() {
  return axios
    .get("/api/user", {
      headers: { "Authorization": "Token " + localStorage.getItem("token") },
    })
    .then((res) => res.data);
}
