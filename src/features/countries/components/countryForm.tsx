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
          style={{
            width: "250px",
            padding: "4px",
            borderRadius: "4px",
          }}
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
          gap: "1.5rem",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setSelectedCountryId("");
            onSubmit("");
          }}
          style={{ border: "1px solid grey" }}
          disabled={isLoading || !selectedCountryId}
        >
          Reset
        </button>
        <button
          type="submit"
          style={{ border: "1px solid grey" }}
          disabled={isLoading || !selectedCountryId}
        >
          Send
        </button>
      </div>
    </form>
  );
}
