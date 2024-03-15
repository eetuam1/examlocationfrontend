import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LocationDetails = ({ location: initialLocation }) => {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [location, setLocation] = useState(initialLocation);
  const [formData, setFormData] = useState({
    name: initialLocation.name,
    address: initialLocation.address,
    latitude: initialLocation.latitude,
    longitude: initialLocation.longitude
  });

  const handleDelete = async () => {
    await fetch(`/api/locations/${location._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/locations/${location._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update location");
      }

      const updatedLocation = await response.json();
      setLocation(updatedLocation);
      setUpdating(false);
      // Reset the form fields
      setFormData({
        name: "",
        address: "",
        latitude: "",
        longitude: ""
      });
    } catch (error) {
      console.error("Update error:", error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className="location-details">
      <h4>{location.name}</h4>
      <p>Address: {location.address}</p>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <div>
        <button style={buttonStyle} onClick={handleDelete}>Delete</button>
        <button style={buttonStyle} onClick={() => setUpdating(true)}>Update</button>
      </div>
      {updating && (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          <button style={buttonStyle} onClick={handleUpdate}>Save</button>
          <button style={buttonStyle} onClick={() => setUpdating(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "lavender",
  border: "none",
  color: "black",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "12px",
};

export default LocationDetails;
