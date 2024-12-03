import { USER_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS } from "@/api/models";
import { redirect } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string, args: RequestInit) => fetch(url, args).then(res => res.json());

export default function useUser(user_id: string, authUserID: string, token: string) {
  if (!authUserID || !token) {
    redirect("/login");
  }  

  // Create request's url and body
  const url = `${process.env.API_URL}${USER_ENDPOINTS.GET_USER(user_id)}`;
  const args = {
    method: "GET",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
    },
  }

  // Make request
  const { data, error, isLoading } = useSWR([url, args], ([url, args]) => fetcher(url, args))

  return {
    user: data,
    isLoading,
    isError: error,
  }
}