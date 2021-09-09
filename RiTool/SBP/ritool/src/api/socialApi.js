import axios from "axios";

export const baseRequest = axios.create({
	baseURL: "http://127.0.0.1:8000/",
});

export const baseUrl = "http://127.0.0.1:8000/";
