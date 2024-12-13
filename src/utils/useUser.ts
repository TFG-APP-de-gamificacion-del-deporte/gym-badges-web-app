import { getUserAction } from "@/actions/user";
import useSWR from "swr";

export default function useUser(userID?: string) {
  const { data, error, isLoading } = useSWR("getUserAction", getUserAction.bind(null, userID), {refreshInterval: 5000});
  
  return {
    user: data,
    error,
    isLoading,
  }
}