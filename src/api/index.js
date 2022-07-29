import axios from "axios";

const api = axios.create({
    baseURL: "https://62aa0f55371180affbce7771.mockapi.io/reactdodopizza/"
});

export default api;