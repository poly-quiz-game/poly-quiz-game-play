import axiosClient from "./axiosClient";

const path = "/room";

const quizApi = {
  getAll() {
    const url = path;
    return axiosClient.get(url, {});
  },
  getOne(id) {
    const url = `${path}/${id}`;
    return axiosClient.get(url, {});
  },
};

export default quizApi;
