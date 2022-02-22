import axiosClient from "./axiosClient";

const path = "/auth/google-login";

const authApi = {
  login(data) {
    const url = path;
    return axiosClient.post(url, data).then((res) => {
      localStorage.setItem("access_token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      return res;
    });
  },
  getOne(id) {
    const url = `${path}/${id}`;
    return axiosClient.get(url, {});
  },
  update(id) {
    const url = `${path}/${id}`;
    return axiosClient.put(url, {});
  },
  delete(id) {
    const url = `${path}/${id}`;
    return axiosClient.delete(url);
  },
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
};

export default authApi;
