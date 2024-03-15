import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LocationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState(null);  
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const location = { name, address, latitude, longitude };
    const response = await fetch("/api/locations", {
      method: "POST",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setAddress("");
      setLatitude("");
      setLongitude("");      
      setError(null);
      navigate("/login");
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Location</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <label>Latitude:</label>
      <input
        type="text"
        onChange={(e) => setLatitude(e.target.value)}
        value={latitude}
      />
      <label>Longitude:</label>
      <input
        type="text"
        onChange={(e) => setLongitude(e.target.value)}
        value={longitude}
      />

      <button>Add Location</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default LocationForm;
