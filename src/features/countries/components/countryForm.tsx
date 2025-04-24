import React, { useState, useRef } from "react";
import { Country } from "../types";
import useCtrlShortcut from "../../../hooks/useCtrlShortcut";

interface CountryFormProps {
  countries: Country[];
  isLoading: boolean;
  onSubmit: (selectedCountryId: string) => void;
}

export default function CountryForm({
  countries,
  isLoading,
  onSubmit,
}: CountryFormProps) {
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const selectCountryRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCountryId) {
      onSubmit(selectedCountryId);
    }
  };

  useCtrlShortcut("Enter", () => {
    selectCountryRef.current?.focus();
  });

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <label htmlFor="countrySelector">Countries:</label>
        <select
          id="countrySelector"
          name="countrySelector"
          ref={selectCountryRef}
          value={selectedCountryId}
          onChange={(e) => setSelectedCountryId(e.target.value)}
          disabled={isLoading}
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries &&
            countries.map((country: Country) => (
              <option key={country.code} value={country.code}>
                {country.emoji + " " + country.name}
              </option>
            ))}
        </select>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setSelectedCountryId("");
            onSubmit("");
          }}
          disabled={isLoading || !selectedCountryId}
        >
          Reset
        </button>
        <button type="submit" disabled={isLoading || !selectedCountryId}>
          Send
        </button>
      </div>
    </form>
  );
}
