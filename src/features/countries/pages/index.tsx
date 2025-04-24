import { useState } from "react";
import useGetCountries from "../api/getCountries";
import { Country } from "../types";
import CountryForm from "../components/countryForm";
import CountryData from "../components/countryData";

export default function Countries() {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined
  );

  const { countries, loading: isLoading } = useGetCountries();

  const handleSubmit = (countryId: string) => {
    const country = countries.find((country) => country.code === countryId);
    setSelectedCountry(country);

    console.log(
      country ? "Selected Country: " + country.name : "No country selected"
    );
  };

  return (
    <>
      <CountryForm
        countries={countries}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />

      {selectedCountry && <CountryData country={selectedCountry} />}
    </>
  );
}
