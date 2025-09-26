import { axiosInstance } from "./api";

type Props = {
  category?: string | null;
  country?: string | null;
  q?: string | null;
};

export const getAllNews = async ({ category, country, q }: Props) => {
  const params: Record<string, string> = { apikey: import.meta.env.VITE_NEWS_API_KEY };

  if (category) {
    params.category = category;
  }

  if (country) {
    params.country = country;
  }

  if (q) {
    params.q = q;
  }

  const { data } = await axiosInstance.get("/latest", { params });
  return data;
};
