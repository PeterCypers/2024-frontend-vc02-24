import axiosRoot from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const getAll = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`);

  return data.items;
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};

export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);

  return data;
};

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? "PUT" : "POST",
    url: `${baseUrl}/${url}/${id ?? ""}`,
    data: values,
  });
};

export const getById = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`);

  return data;
};

export const updateNotificationStatus = async (id, status) => {
  try {
    return await axios.put(`${baseUrl}/notificaties/${id}`, {
      notificatieStatus: status,
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateAllNotifications = async () => {
  try {
    return await axios.post(`${baseUrl}/notificaties`, {});
  } catch (error) {
    handleError(error);
  }
};

export const getNotifications = async (page = 1, limit = 10) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/notificaties?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
