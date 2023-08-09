import { useMemo } from "react";

interface SortedDataOptions<T> {
  data: T[];
  sort: "asc" | "desc";
  selectedColumn: keyof T;
}

export const SortedData = <T>({ data, sort, selectedColumn }: SortedDataOptions<T>): T[] => {
  return useMemo(() => {
    const sortedData = [...data].sort((a, b) => {
      if (sort === "asc") {
        return a[selectedColumn] > b[selectedColumn] ? 1 : -1;
      } else {
        return a[selectedColumn] < b[selectedColumn] ? 1 : -1;
      }
    });
    return sortedData;
  }, [data, sort, selectedColumn]);
};
