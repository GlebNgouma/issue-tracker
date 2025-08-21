import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUsers = () => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s(la liste va etre considere comme fraiche dans 60s)
    retry: 3,
  });

  return { data, isLoading, error };
};
