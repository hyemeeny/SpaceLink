"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  const { data } = await axios.get("/api/user");
  return data;
};

export const useUser = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
  });

  return { data, isPending, isError, error };
};
