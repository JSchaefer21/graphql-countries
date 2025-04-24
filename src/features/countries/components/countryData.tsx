import { Country } from "../types";
import Flag from "react-world-flags";

interface CountryDataProps {
  country: Country;
}

export default function CountryData({ country }: CountryDataProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <h3>Sent Country Data:</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <strong>Emoji: </strong>
          <Flag code={country.code} style={{ height: "1rem", width: "auto" }} />
        </span>
        <span>
          <strong>Code:</strong> {country.code}
        </span>
        <span>
          <strong>Name:</strong> {country.name}
        </span>
      </div>
    </div>
  );
}
