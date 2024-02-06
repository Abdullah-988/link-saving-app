import axios from "../libs/axios";

type link = {
  id: number;
  link: string;
  description: string;
  owner: number;
  category: number;
};

export function getLinks({ categoryId }: { categoryId: number }) {
  return axios
    .get(`/api/category/${categoryId}/link`, {
      headers: { "Authorization": "Token " + localStorage.getItem("token") },
    })
    .then((res) => res.data as link[]);
}

export function createLink({
  categoryId,
  link,
  description,
}: {
  categoryId: number;
  link: string;
  description: string;
}) {
  return axios
    .post(
      `/api/category/${categoryId}/link`,
      { link, description },
      {
        headers: { "Authorization": "Token " + localStorage.getItem("token") },
      }
    )
    .then((res) => res.data as link);
}

export function editLink({
  linkId,
  link,
  description,
}: {
  linkId: number;
  link: string;
  description: string;
}) {
  return axios
    .put(
      `/api/link/${linkId}`,
      { link, description },
      {
        headers: { "Authorization": "Token " + localStorage.getItem("token") },
      }
    )
    .then((res) => res.data as link);
}

export function deleteLink({ linkId }: { linkId: number }) {
  return axios
    .delete(`/api/link/${linkId}`, {
      headers: { "Authorization": "Token " + localStorage.getItem("token") },
    })
    .then((res) => res.data as link);
}
