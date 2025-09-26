import axios from 'axios';
import { BASE_URL } from "@/utils/BASE_URL";

export const axiosInstance = axios.create({ baseURL: `${BASE_URL}`})