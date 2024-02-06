import axios from "../libs/axios";

type category = {
  id: number;
  name: string;
  owner: number;
};

export function getCategories() {
  return axios
    .get("/api/category", {
      headers: { "Authorization": "Token " + localStorage.getItem("token") },
    })
    .then((res) => res.data as category[]);
}

export function createCategory(data: { name: string }) {
  return axios
    .post("/api/category", data, {
      headers: { "Authorization": "Token " + localStorage.getItem("token") },
    })
    .then((res) => res.data as category);
}

export function editCategory({ id, name }: { id: number; name: string }) {
  return axios
    .put(
      `/api/category/${id}`,
      { name },
      {
        headers: { "Authorization": "Token " + localStorage.getItem("token") },
      }
    )
    .then((res) => res.data as category);
}

export function deleteCategory({ id }: { id: number }) {
  return axios
    .delete(`/api/category/${id}`, {
      headers: { "Authorization": "Token " + localStorage.getItem("token") },
    })
    .then((res) => res.data as category);
}
