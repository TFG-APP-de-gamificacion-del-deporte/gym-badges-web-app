import { API_ENDPOINTS, API_KEYS } from "@/config/API";
import { redirect } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string, args: RequestInit) => fetch(url, args).then(res => res.json());

export default function useUser(user_id: string, authUserID: string, token: string) {
  if (!authUserID || !token) {
    redirect("/login");
  }  

  // Create request's url and body
  const url = `${process.env.API_URL}${API_ENDPOINTS.getUser}/${user_id}`;
  const args = {
    method: "GET",
    headers: {
      [API_KEYS.AUTH_USER_ID_KEY]: authUserID,
      [API_KEYS.TOKEN_KEY]: token,
    }
  }

  // Make request
  const { data, error, isLoading } = useSWR([url, args], ([url, args]) => fetcher(url, args))

  return {
    user: data,
    isLoading,
    isError: error
  }
}