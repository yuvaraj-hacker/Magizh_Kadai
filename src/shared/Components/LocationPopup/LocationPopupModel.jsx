
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { getalllocation } from "../../../admin/shared/services/apilocation/apilocation";


const LocationModal = ({ isOpen, setIsOpen, onLocationChange }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [allowedCities, setAllowedCities] = useState([]);
  
  
  // useEffect(() => {
   
  //   const fetchCities = async () => {
  //     try {
  //       const response = await getalllocation();
  //       const cities = response.resdata.filter((location) => location.Status === "Active").map((location) => location.City);
  //       setAllowedCities(cities);
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //       toast.error("Failed to load cities. Please try again.");
  //     }
  //   };

  //   fetchCities();
  // }, []);

  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      setSelectedCity(savedLocation);
    }
  }, []);

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleConfirmLocation = () => {
    if (selectedCity && allowedCities.includes(selectedCity)) {
      localStorage.setItem("selectedLocation", selectedCity);
      onLocationChange(selectedCity);
      setIsOpen(false);
      toast.success("Location updated successfully!");
    } else {
      toast.error("Sorry, we do not deliver to that location yet.");
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const city = await getCityFromCoordinates(latitude, longitude);
        if (allowedCities.includes(city)) {
          setSelectedCity(city);
          toast.success("Location detected!");
        } else {
          toast.error("Sorry, we do not deliver to your location yet.");
        }
        setDetectingLocation(false);
      },
      (error) => {
        console.error("Error detecting location:", error);
        toast.error("Unable to detect location");
        setDetectingLocation(false);
      }
    );
  };

  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const apiKey = "b658161c1ab54dce84bf38aee4f5942f";
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );

      const data = await response.json();
      if (data?.results?.length > 0) {
        const city =
          data.results[0].components.city ||
          data.results[0].components.town ||
          data.results[0].components.village;
        return city
          ? `${city}, ${data.results[0].components.state}`
          : "Unknown Location";
      } else {
        return "Unknown Location";
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
      return "Unknown Location";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="p-6 border-b">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Choose Your Location
            </h2>
          </div>
          <p className="mt-2 text-center text-gray-600">
            Select your delivery location to see product availability and
            delivery options
          </p>
        </div>
        <div className="p-6">
          {/* <button
            onClick={detectLocation}
            className={`w-full px-4 py-3 mb-4 font-medium text-white rounded-lg ${
              detectingLocation ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={detectingLocation}
          >
            {detectingLocation ? "Detecting Location..." : "Detect My Location"}
          </button> */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select City
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            <option value="">Select a city</option>
            {allowedCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="p-6 border-t">
          <button
            onClick={handleConfirmLocation}
            className="w-full px-4 py-3 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
            disabled={!selectedCity}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
