import LocationForm from "../components/LocationForm";
import LocationDetails from "../components/LocationDetails";
import { useEffect, useState } from "react";
const Home = () => {
  const [locationArray, setLocationArray] = useState([]);
  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch("/api/locations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        setLocationArray([]);
        return;
      }
      setLocationArray(data);
    };
    getLocation();
  }, []);
  return (
    <div className="home">
      <div className="location">
        {locationArray.length === 0 && <h2>No locations Found</h2>}
        {locationArray.map((location) => (
          <LocationDetails key={location._id} location={location} />
        ))}
      </div>
      <LocationForm />
    </div>
  );
};
export default Home;