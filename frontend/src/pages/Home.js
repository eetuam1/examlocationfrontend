import LocationDetails from "../components/LocationDetails";
import LocationForm from "../components/LocationForm";
import { useEffect, useState } from "react";

const Home = () => {
  const [locationArray, setLocationArray] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      const response = await fetch("/api/location", {
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
    getLocations();
  }, []);

  return (
    <div className="home">
      <div className="locationArray">
        {locationArray.length === 0 && <h2>No Locations Found</h2>}
        {locationArray.map((location) => (
          <LocationDetails key={location._id} location={location} />
        ))}
      </div>
      <LocationForm />
    </div>
  );
};
export default Home;


