// src/Pages/Home.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const [checkinCount, setCheckinCount] = useState(0);
  const [busLocationCount, setBusLocationCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const checkinsSnap = await getDocs(collection(db, "checkins"));
      const locationsSnap = await getDocs(collection(db, "busLocations"));
      const alertsSnap = await getDocs(collection(db, "notifications"));

      setCheckinCount(checkinsSnap.size);
      setBusLocationCount(locationsSnap.size);
      setAlertCount(alertsSnap.size);
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white">
      <StatCard title="🚌 Total Check-Ins" value={checkinCount} color="bg-blue-600" />
      <StatCard title="📍 Location Updates" value={busLocationCount} color="bg-yellow-600" />
      <StatCard title="⚠️ Alerts Sent" value={alertCount} color="bg-red-600" />
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow-lg ${color}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default Dashboard;
