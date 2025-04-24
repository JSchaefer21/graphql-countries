import { gql, useQuery } from "@apollo/client";
import { Country } from "../types";

const GET_COUNTRIES_QUERY = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`;

export default function useGetCountries() {
  const { data, loading, error } = useQuery<{ countries: Country[] }>(
    GET_COUNTRIES_QUERY
  );

  return {
    countries: data?.countries || [],
    loading,
    error,
  };
}
