import { useState, useEffect } from "react";
import LocationForm from "../components/LocationForm";
import LocationDetails from "../components/LocationDetails";

const Home = () => {
  const [locationArray, setLocationArray] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/location", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setLocationArray(data);
      } catch (error) {
        console.error(error);
        setLocationArray([]);
      }
    };
    getLocations();
  }, []);

  const addLocationToList = (newLocation) => {
  console.log("Previous Locations:", locationArray);
  setLocationArray((prevLocations) => [...prevLocations, newLocation]);
  console.log("Updated Locations:", locationArray);
};

  return (
    <div className="home">
      <div className="locationArraylocation">
        {locationArray.length === 0 && <h2>No Locations Found</h2>}
        {locationArray.map((location) => (
          <LocationDetails key={location._id} location={location} />
        ))}
      </div>
      <LocationForm addLocationToList={addLocationToList} />
    </div>
  );
};

export default Home;
