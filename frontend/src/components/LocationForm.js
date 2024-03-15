import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LocationForm = ({ addLocationToList }) => {
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
    try {
      const response = await fetch("http://localhost:4000/api/location", {
        method: "POST",
        body: JSON.stringify(location),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      // Add the new location to the list
      addLocationToList(data);
      // Clear form fields and error
      setName("");
      setAddress("");
      setLatitude("");
      setLongitude("");
      setError(null);
      // Navigate to desired location
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.message);
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
