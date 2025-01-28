
// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import axios from "axios";
// import { MapPin, Truck, CheckCircle, AlertCircle } from "lucide-react";
// import { apigetdeliveryorder, getcoordinates } from "../../shared/services/apideliveryroute/apideliveryroute";
// import apiurl from "../../../shared/services/apiendpoint/apiendpoint";

// // Mapbox access token (Note: Replace with your actual Mapbox access token)
// mapboxgl.accessToken = "pk.eyJ1IjoidGN6YWRtaW4iLCJhIjoiY20zeWNzNHlzMHpnczJqcHNzMHF2b2wyciJ9.PydcoJiIJQoZnlSTwYYraw";

// const DeliveryTracking = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [orders, setOrders] = useState([]);
//   const [orderMasters, setOrderMasters] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [deliveryStatus, setDeliveryStatus] = useState({});


//   const fetchCoordinatesFromAPI = async (address) => {
//     try {
//       const response = await getcoordinates({ address });
//       return response;
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//       return null;
//     }
//   };


//   const fetchRouteDetails = async (start, end) => {
//     try {
//       const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;
//       const response = await axios.get(url);

//       if (response.data.routes.length > 0) {
//         const route = response.data.routes[0];
//         return {
//           geometry: route.geometry,
//           distance: (route.distance / 1000).toFixed(2), // km
//           duration: Math.round(route.duration / 60), // minutes
//         };
//       }
//       throw new Error("No routes found");
//     } catch (error) {
//       console.error("Error fetching route:", error);
//       return null;
//     }
//   };

//   // Plot animated route
//   const plotAnimatedRoute = async (order, orderMaster) => {
//     // Remove existing map
//     if (map.current) {
//       map.current.remove();
//     }

//     // Initialize new map
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/navigation-day-v1",
//       center: [-122.084, 37.422],
//       zoom: 10,
//     });

//     try {
//       // Fetch warehouse and delivery coordinates
//       const warehouseLocation = await fetchCoordinatesFromAPI(
//         order.Delivery_Address_id.Address +
//         ", " + order.Delivery_Address_id.City +
//         ", " + order.Delivery_Address_id.State +
//         ", " + order.Delivery_Address_id.Country
//       );

//       const deliveryLocation = await fetchCoordinatesFromAPI(order.Delivery_Address);

//       if (!warehouseLocation || !deliveryLocation) {
//         throw new Error("Could not fetch coordinates");
//       }

//       // Fetch route details
//       const routeDetails = await fetchRouteDetails(warehouseLocation, deliveryLocation);

//       if (!routeDetails) {
//         throw new Error("Could not fetch route details");
//       }

//       // Add warehouse marker
//       const warehouseMarker = new mapboxgl.Marker({
//         color: "#1DB954",
//         scale: 1.2
//       })
//         .setLngLat([warehouseLocation.lng, warehouseLocation.lat])
//         .addTo(map.current)
//         .setPopup(new mapboxgl.Popup().setHTML("Warehouse Location"));

//       // Add delivery marker
//       const deliveryMarker = new mapboxgl.Marker({
//         color: "#FF0000",
//         scale: 1.2
//       })
//         .setLngLat([deliveryLocation.lng, deliveryLocation.lat])
//         .addTo(map.current)
//         .setPopup(new mapboxgl.Popup().setHTML(`
//           <strong>Delivery Address:</strong> ${order.Delivery_Address}<br/>
//           <strong>Order ID:</strong> ${order.Order_id}<br/>
//           <strong>Product:</strong> ${orderMaster.Product_Name}
//           <strong>Product Image:</strong><br/>
//       <img src="${apiurl()}/${orderMaster?.Images[0]}" alt="${orderMaster?.Product_Name}" style="width: 100px; height: auto; border-radius: 8px;" />


//         `));

//       // Add animated route
//       map.current.on('load', () => {
//         // Add the route source
//         map.current.addSource('route', {
//           'type': 'geojson',
//           'data': {
//             'type': 'Feature',
//             'properties': {},
//             'geometry': routeDetails.geometry
//           }
//         });

//         // Add a layer for the route line
//         map.current.addLayer({
//           'id': 'route-line',
//           'type': 'line',
//           'source': 'route',
//           'layout': {
//             'line-join': 'round',
//             'line-cap': 'round'
//           },
//           'paint': {
//             'line-color': '#4264fb',
//             'line-width': 5,
//             // Animated line dash pattern
//             'line-dasharray': [0.5, 2]
//           }
//         });

//         // Add a truck marker for animation
//         const truckMarker = new mapboxgl.Marker({
//           element: createTruckMarkerElement(),
//           offset: [0, -20]
//         });

//         // Animate truck along the route
//         animateTruckAlongRoute(map.current, routeDetails.geometry.coordinates, truckMarker);

//         // Center and zoom the map
//         map.current.fitBounds([
//           [warehouseLocation.lng, warehouseLocation.lat],
//           [deliveryLocation.lng, deliveryLocation.lat]
//         ], { padding: 100 });
//       });

//     } catch (error) {
//       console.error("Error plotting animated route:", error);
//     }
//   };

//   // Create custom truck marker element
//   const createTruckMarkerElement = () => {
//     const el = document.createElement('div');
//     el.innerHTML = `
//       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" 
//            fill="none" stroke="#FF6B6B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//         <path d="M14 4v4h4v4h-4v4h4v4H2V4h12z"/>
//         <circle cx="7" cy="19" r="2"/>
//         <circle cx="15" cy="19" r="2"/>
//       </svg>
//     `;
//     el.style.cursor = 'pointer';
//     return el;
//   };

//   // Animate truck along route
//   const animateTruckAlongRoute = (map, coordinates, truckMarker) => {
//     let currentIndex = 0;

//     // Add the marker to the map
//     truckMarker.setLngLat(coordinates[0]).addTo(map);

//     // Animation function
//     const animateTruck = () => {
//       if (currentIndex < coordinates.length - 1) {
//         currentIndex++;

//         // Interpolate between current and next coordinate
//         const start = coordinates[currentIndex - 1];
//         const end = coordinates[currentIndex];

//         // Create a smooth transition
//         const progress = 0;
//         const interpolatedCoord = [
//           start[0] + (end[0] - start[0]) * progress,
//           start[1] + (end[1] - start[1]) * progress
//         ];

//         // Update truck marker position
//         truckMarker.setLngLat(interpolatedCoord);

//         // Animate to next coordinate
//         requestAnimationFrame(() => {
//           let start = null;
//           const step = (timestamp) => {
//             if (!start) start = timestamp;
//             const progress = Math.min((timestamp - start) / 1000, 1);

//             const interpolatedCoord = [
//               start[0] + (end[0] - start[0]) * progress,
//               start[1] + (end[1] - start[1]) * progress
//             ];

//             truckMarker.setLngLat(interpolatedCoord);

//             if (progress < 1) {
//               requestAnimationFrame(step);
//             } else {
//               // Move to next coordinate
//               setTimeout(animateTruck, 100);
//             }
//           };
//           requestAnimationFrame(step);
//         });
//       }
//     };

//     // Start animation
//     animateTruck();
//   };

//   // Fetch delivery orders
//   const fetchDeliveryOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await apigetdeliveryorder({});

//       if (response) {
//         setOrders(response.orders);
//         setOrderMasters(response.orderMasters);

//         // Initialize delivery status tracking
//         const statusMap = {};
//         response.orders.forEach(order => {
//           statusMap[order.Order_id] = order.Order_Status;
//         });
//         setDeliveryStatus(statusMap);

//         // Automatically select first order if exists
//         if (response.orders.length > 0) {
//           const firstOrder = response.orders[0];
//           const matchingOrderMaster = response.orderMasters.find(
//             om => om.Order_id === firstOrder.Order_id
//           );
//           setSelectedOrder(firstOrder);

//           // Plot route for first order
//           await plotAnimatedRoute(firstOrder, matchingOrderMaster);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching delivery orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize component
//   useEffect(() => {
//     fetchDeliveryOrders();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className="w-1/3 p-6 overflow-y-auto bg-white shadow-lg">
//         <h2 className="flex items-center mb-4 text-2xl font-bold text-gray-800">
//           <Truck className="mr-2 text-blue-600" /> Delivery Routes
//         </h2>

//         {loading ? (
//           <div className="text-center text-gray-500">Loading routes...</div>
//         ) : (
//           <div className="space-y-4">
//             {orders.map((order) => {
//               // Find matching order master
//               const orderMaster = orderMasters.find(
//                 om => om.Order_id === order.Order_id
//               );

//               return (
//                 <div
//                   key={order.Order_id}
//                   onClick={() => {
//                     setSelectedOrder(order);
//                     plotAnimatedRoute(order, orderMaster);
//                   }}
//                   className={`
//                     p-4 rounded-lg cursor-pointer transition-all duration-300 
//                     ${selectedOrder && selectedOrder.Order_id === order.Order_id
//                       ? 'bg-blue-100 border-2 border-blue-500'
//                       : 'bg-gray-50 hover:bg-gray-100'
//                     }
//                   `}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={`${apiurl()}/${orderMaster?.Images[0]}`}
//                         alt={orderMaster?.Product_Name}
//                         className="object-cover w-16 h-16 rounded-lg"
//                       />
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-gray-800">{order.Order_id}</h3>
//                       <p className="text-sm text-gray-600 truncate">
//                         {orderMaster ? orderMaster.Product_Name : 'N/A'}
//                       </p>
//                       <p className="text-xs text-gray-500">{order.Delivery_Address}</p>
//                     </div>
//                     <div className="flex items-center">
//                       {order.Order_Status === "Delivered" ? (
//                         <CheckCircle className="text-green-500" />
//                       ) : (
//                         <AlertCircle className="text-yellow-500" />
//                       )}
//                       <span className={`ml-2 text-sm font-medium ${order.Order_Status === "Order Delivered"
//                           ? "text-green-600"
//                           : "text-yellow-600"
//                         }`}>
//                         {order.Order_Status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <div className="w-2/3 p-6">
//         <div
//           ref={mapContainer}
//           className="w-full h-[calc(100vh-3rem)] rounded-lg shadow-xl border-2 border-gray-200"
//         />
//       </div>
//     </div>
//   );
// };

// export default DeliveryTracking;

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { MapPin, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { apigetdeliveryorder } from "../../shared/services/apideliveryroute/apideliveryroute"; // Your API service

// Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoidGN6YWRtaW4iLCJhIjoiY20zeWNzNHlzMHpnczJqcHNzMHF2b2wyciJ9.PydcoJiIJQoZnlSTwYYraw";

// Default retail shop address coordinates (static)
const RETAIL_SHOP_COORDINATES = { lng: -122.084, lat: 37.422 };

const DeliveryTracking = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [orders, setOrders] = useState([]);
  const [orderMasters, setOrderMasters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Plot routes from retail shop to delivery addresses
  const plotDeliveryRoutes = async () => {
    if (map.current) {
      map.current.remove();
    }

    // Initialize new map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: [RETAIL_SHOP_COORDINATES.lng, RETAIL_SHOP_COORDINATES.lat],
      zoom: 10,
    });

    try {
      // Add retail shop marker
      const retailShopMarker = new mapboxgl.Marker({
        color: "#1DB954",
        scale: 1.5
      })
        .setLngLat([RETAIL_SHOP_COORDINATES.lng, RETAIL_SHOP_COORDINATES.lat])
        .addTo(map.current)
        .setPopup(new mapboxgl.Popup().setHTML("Retail Shop Location"));

      // Fetch delivery addresses and coordinates
      const response = await apigetdeliveryorder();
      const orders = response.orders;
      const orderMasters = response.orderMasters;

      // Add delivery markers and routes
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([RETAIL_SHOP_COORDINATES.lng, RETAIL_SHOP_COORDINATES.lat]);

      orders.forEach((order, index) => {
        if (order.deliveryCoordinates) {
          const deliveryCoordinates = order.deliveryCoordinates;

          // Add delivery location marker
          const deliveryMarker = new mapboxgl.Marker({
            color: "#FF0000",
            scale: 1.2
          })
            .setLngLat([deliveryCoordinates.lng, deliveryCoordinates.lat])
            .addTo(map.current)
            .setPopup(new mapboxgl.Popup().setHTML(`
              <strong>Delivery Address:</strong> ${order.Delivery_Address}<br/>
              <strong>Order ID:</strong> ${order.Order_id}<br/>
              <strong>Product:</strong> ${orderMasters.find(om => om.Order_id === order.Order_id)?.Product_Name || 'N/A'}
            `));

          // Extend map bounds to include all markers
          bounds.extend([deliveryCoordinates.lng, deliveryCoordinates.lat]);

          // Draw route from retail shop to delivery address
          map.current.on('load', () => {
            fetchRoute(RETAIL_SHOP_COORDINATES, deliveryCoordinates)
              .then(routeDetails => {
                if (routeDetails) {
                  map.current.addSource(`route-${index}`, {
                    'type': 'geojson',
                    'data': {
                      'type': 'Feature',
                      'properties': {},
                      'geometry': routeDetails.geometry,
                    }
                  });

                  map.current.addLayer({
                    'id': `route-line-${index}`,
                    'type': 'line',
                    'source': `route-${index}`,
                    'layout': {
                      'line-join': 'round',
                      'line-cap': 'round',
                    },
                    'paint': {
                      'line-color': `hsl(${index * 30}, 70%, 50%)`, // Unique color for each route
                      'line-width': 3,
                      'line-opacity': 0.7,
                    },
                  });
                }
              });
          });
        }
      });

      // Fit map to all markers
      map.current.fitBounds(bounds, { padding: 100, maxZoom: 12 });

    } catch (error) {
      console.error("Error plotting delivery routes:", error);
    }
  };

  // Fetch route details from Mapbox API
  const fetchRoute = async (start, end) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;
    const response = await axios.get(url);

    if (response.data.routes.length > 0) {
      return {
        geometry: response.data.routes[0].geometry,
        distance: (response.data.routes[0].distance / 1000).toFixed(2), // km
        duration: Math.round(response.data.routes[0].duration / 60), // minutes
      };
    }

    return null;
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      await plotDeliveryRoutes(); // Plot routes for all orders
    } catch (error) {
      console.error("Error fetching delivery orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize component
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/3 p-6 overflow-y-auto bg-white shadow-lg">
        <h2 className="flex items-center mb-4 text-2xl font-bold text-gray-800">
          <Truck className="mr-2 text-blue-600" /> Delivery Routes
        </h2>

        <div className="p-3 mb-4 rounded-lg bg-blue-50">
          <p className="flex items-center text-sm text-blue-700">
            <MapPin className="mr-2" /> 
            Start Point: Retail Shop Location
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading routes...</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              return (
                <div key={order.Order_id} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={`/images/products/${orderMasters.find(om => om.Order_id === order.Order_id)?.Images[0]}`}
                        alt="Product"
                        className="object-cover w-16 h-16 rounded-lg"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">{order.Order_id}</h3>
                      <p className="text-sm text-gray-600 truncate">{order.Delivery_Address_id.Address}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-2/3 p-6">
        <div ref={mapContainer} className="w-full h-[calc(100vh-3rem)] rounded-lg shadow-xl border-2 border-gray-200" />
      </div>
    </div>
  );
};

export default DeliveryTracking;
