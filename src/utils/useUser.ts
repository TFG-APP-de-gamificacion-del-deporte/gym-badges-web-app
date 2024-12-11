import { getUserAction } from "@/actions/user";
import useSWR from "swr";

export default function useUser() {
  const { data, error, isLoading } = useSWR("getUserAction", getUserAction.bind(null, undefined), {refreshInterval: 5000});

  return {
    user: data,
    error,
    isLoading,
  }
}