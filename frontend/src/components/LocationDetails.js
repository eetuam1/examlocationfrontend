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
      <h4>{location.title}</h4>
      <p>Author: {location.author}</p>
      <p>Genre: {location.genre}</p>
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
