import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams);

      // Check if 'search' or 'status' has a non-empty value
      const shouldResetPagination =
        (params.search && params.search.trim() !== "") ||
        (params.status && params.status.trim() !== "");

      if (shouldResetPagination) {
        newParams.delete("page");
        newParams.delete("size");
      }

      Object.entries(params).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  return updateSearchParams;
};

export default useUpdateSearchParams;
