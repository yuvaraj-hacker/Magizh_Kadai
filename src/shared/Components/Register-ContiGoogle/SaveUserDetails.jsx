import { Button } from "@nextui-org/react";
import { Dialog } from "primereact/dialog";
import { useState, useEffect, useCallback } from "react";
import { getalllocation } from "../../../admin/shared/services/apilocation/apilocation";


export default function SaveUserDetails({ visible, setVisible, initialEmail, initialPhone, onSubmit }) {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
    First_Name: '',
    Last_Name: '',
    Mobilenumber: '',
    Address: '',
    City: '',
    State: '',
    Country: 'United States of America',
    Zipcode: '',
  });

  const [location, setLocation] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [availableZipcodes, setAvailableZipcodes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch locations
  const getLocationData = useCallback(async () => {
    try {
      const response = await getalllocation({});
      setLocation(response?.resdata || []);
    } catch (error) {
      console.error("Failed to fetch location data:", error);
    }
  }, []);

  var isMounted = true;
  useEffect(()=>{
      if(isMounted){
        getLocationData();
      }
      return ()=>(isMounted = false);
  },[getLocationData])

  // Update city options when location changes
  useEffect(() => {
    if (location && location.resdata) {
        // Filter and format city options
        const formattedCities = (location.resdata || []).map(loc => ({
            ...loc,
            displayName: loc.Status === "Active" 
                ? loc.City 
                : `${loc.City} (Coming Soon)`
        }));
        setCityOptions(formattedCities);
    } else if (Array.isArray(location)) {
        const formattedCities = location.map(loc => ({
            ...loc,
            displayName: loc.Status === "Active" 
                ? loc.City 
                : `${loc.City} (Coming Soon)`
        }));
        setCityOptions(formattedCities);
    }
}, [location]);

  // Update initial email/phone
  useEffect(() => {
    if (initialEmail || initialPhone) {
      setFormData((prev) => ({
        ...prev,
        Email: initialEmail || '',
        Mobilenumber: initialPhone || '',
      }));
    }
  }, [initialEmail, initialPhone]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // // Handle city selection
  // const handleCityChange = (e) => {
  //   const selectedCity = e.target.value;
  //   const matchedLocation = cityOptions.find((loc) => loc.City.toLowerCase() === selectedCity.toLowerCase());
  //   const zipcodes = matchedLocation?.Zipcode.split(",").map((zip) => zip.trim()) || [];

  //   setAvailableZipcodes(zipcodes);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     City: matchedLocation?.City || '',
  //     State: matchedLocation?.State || '',
  //     Zipcode: zipcodes.length === 1 ? zipcodes[0] : '',
  //     Country: 'United States of America',
  //   }));
  // };

  // Modified handleCityChange
const handleCityChange = (e) => {
  const selectedCity = e.target.value;
  const matchedLocation = cityOptions.find(loc => 
      loc.City.toLowerCase() === selectedCity.toLowerCase()
  );

  if (matchedLocation) {
      if (matchedLocation.Status !== "Active") {
          e.preventDefault();
          return;
      }

      const zipcodes = matchedLocation.Zipcode.split(',').map(zip => zip.trim());
      setAvailableZipcodes(zipcodes);
      
      setFormData(prevData => ({
          ...prevData,
          City: matchedLocation.City,
          State: matchedLocation.State,
          Zipcode: zipcodes.length === 1 ? zipcodes[0] : '',
          Country: "United States of America"
      }));
      setSelectedLocation(null);
      setAvailableZipcodes([]);
  }
  handlechange(e);
};
  // Handle zipcode selection
  const handleZipcodeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      Zipcode: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const transformedData = {
        Email: formData.Email,
        Password: formData.Password,
        First_Name: formData.First_Name,
        Last_Name: formData.Last_Name,
        Mobilenumber: formData.Mobilenumber,
        ShippingInfo: { ...formData },
      };

      await onSubmit(transformedData);
      setVisible(false);
    } catch (error) {
      console.error("Failed to save user details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog visible={visible} onHide={() => setVisible(false)} style={{ width: "55vw" }} className="overflow-y-auto max-h-[90vh]" breakpoints={{ "960px": "75vw", "641px": "100vw" }}>
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="mb-6 text-xl font-semibold">Complete Your Profile</h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div>
            <div>
              <label>Email</label>
            </div>
            <input type="email" name="Email" value={formData.Email} className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" onChange={handleInputChange} required  />
          </div>

          <div>
            <div>
              <label>Password</label>
            </div>
            <input type="password" name="Password" value={formData.Password} className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" onChange={handleInputChange} required  />
          </div>

          <div>
            <div>
              <label>First Name</label>
            </div>
            <input type="text" name="First_Name" value={formData.First_Name} className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" onChange={handleInputChange} required />
          </div>

          <div>
            <div>
              <label>Last Name</label>
            </div>
            <input type="text" name="Last_Name" value={formData.Last_Name} className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" onChange={handleInputChange} required />
          </div>

          <div>
            <div>
              <label>Mobile Number</label>
            </div>
            <input type="text" name="Mobilenumber" value={formData.Mobilenumber} className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" onChange={handleInputChange} required />
          </div>

          <div>
            <div>
              <label>Address</label>
            </div>
            <input type="text" name="Address" value={formData.Address} className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" onChange={handleInputChange} required />
          </div>

          {/* <div>
            <div>
              <label>City</label>
            </div>
            <select
    name="City"
    value={formData?.City || ''}
    onChange={handleCityChange}
    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200"
    required
>
    <option value="" disabled>Select City</option>
    {cityOptions.map((loc) => (
        <option 
            key={loc._id} 
            value={loc.City}
            disabled={loc.Status !== "Active"}
            className={loc.Status !== "Active" ? 'text-gray-400' : ''}
        >
            {loc.displayName}
        </option>
    ))}
</select>
          </div>

          <div>
            <div>
              <label>State</label>
            </div>
            <input type="text" name="State" value={formData.State} className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" onChange={handleInputChange} required 
            />
          </div>

          <div>
            <div>
              <label>Country</label>
            </div>
            <input type="text" name="Country" value={formData.Country} className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" onChange={handleInputChange} required disabled 
            />
          </div>

          <div>
            <div>
              <label>Zipcode</label>
            </div>
            {availableZipcodes.length > 1 ? (
                <select
                    name="Zipcode"
                    value={formData?.Zipcode || ''}
                    onChange={handleZipcodeChange}
                    className="w-full px-4 py-2 mt-1 border outline-none rounded-xl"
                    required
                >
                    <option value="" disabled>Select Zipcode</option>
                    {availableZipcodes.map((zip, index) => (
                        <option key={index} value={zip}>
                            {zip}
                        </option>
                    ))}
                </select>
            ) : (
                <input 
                    type="text" 
                    name="Zipcode" 
                    value={formData?.Zipcode || ''} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 mt-1 border outline-none rounded-xl" 
                    pattern="[0-9]*"
                    required 
                    readOnly={availableZipcodes.length === 1}
                />
            )}
          </div> */}
          
        </div>

        <Button type="submit" className="w-full mt-6 text-white bg-green-500" size="lg" isLoading={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Dialog>
  );
}