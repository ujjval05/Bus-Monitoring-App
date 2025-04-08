// src/Pages/Alerts.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

function Notifications() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notifications"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlerts(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">📢 Emergency Alerts</h2>
      
      {alerts.map((alert) => (
        <div key={alert.id} className="mb-4 p-4 border border-red-400 rounded-lg bg-red-100">
          <p className="text-red-800 font-semibold">🚨 {alert.message}</p>
          <p className="text-sm text-gray-700 mt-1">⏰ {new Date(alert.timestamp?.toDate()).toLocaleString()}</p>
        </div>
      ))}

      {alerts.length === 0 && (
        <p className="text-center text-gray-500">No emergency alerts yet.</p>
      )}
    </div>
  );
}

export default Notifications;
