import { useNavigate } from "react-router-dom";

const  LocationDetails= ({ location }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    await fetch(`/api/location/${location._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate("/login");
  };

  return (
    <div className="location-details">
      <h4>{location.name}</h4>
      <p>Address: {location.address}</p>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <span
        className="material-symbols-outlined"
        onClick={handleClick}
      >
        delete
      </span>
    </div>
  );
};

export default LocationDetails;
