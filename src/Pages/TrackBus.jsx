// src/Pages/TrackBus.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

function TrackBus() {
  const [locations, setLocations] = useState([]);
  const [selectedBus, setSelectedBus] = useState("All");

  useEffect(() => {
    const q = query(collection(db, "busLocations"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLocations(data);
    });

    return () => unsubscribe();
  }, []);

  const uniqueBusNumbers = [...new Set(locations.map(loc => loc.busNumber))];

  const filteredLocations = selectedBus === "All"
    ? locations
    : locations.filter(loc => loc.busNumber === selectedBus);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">📍 Live Bus Locations</h2>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Filter by Bus Number:</label>
        <select
          value={selectedBus}
          onChange={(e) => setSelectedBus(e.target.value)}
          className="w-full p-2 border rounded bg-blue-700 text-white"
        >
          <option value="All">All Buses</option>
          {uniqueBusNumbers.map(bus => (
            <option key={bus} value={bus}>
              {bus}
            </option>
          ))}
        </select>
      </div>

      {filteredLocations.map((loc) => (
        <div key={loc.id} className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
          <p><strong>🚌 Bus No:</strong> {loc.busNumber}</p>
          <p><strong>📍 Location:</strong> {loc.locationText}</p>
          <p><strong>⏰ Updated At:</strong> {new Date(loc.timestamp?.toDate()).toLocaleString()}</p>
        </div>
      ))}

      {filteredLocations.length === 0 && (
        <p className="text-center text-gray-600">No location updates yet.</p>
      )}
    </div>
  );
}

export default TrackBus;
