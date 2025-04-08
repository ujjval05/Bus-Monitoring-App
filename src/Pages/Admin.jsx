// src/Pages/Admin.jsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AdminPanel() {
  const [busNumber, setBusNumber] = useState("");
  const [locationText, setLocationText] = useState("");
  const [success, setSuccess] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "busLocations"), {
        busNumber,
        locationText,
        timestamp: Timestamp.now()
      });

      setSuccess("Bus location updated ✅");
      setBusNumber("");
      setLocationText("");
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const handleAlertSubmit = async (e) => {
    e.preventDefault();

    if (!alertMessage.trim()) return;

    try {
      await addDoc(collection(db, "notifications"), {
        message: alertMessage,
        timestamp: Timestamp.now()
      });
      setAlertSuccess("Alert sent successfully 🚨");
      setAlertMessage("");
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">🛠️ Update Bus Location</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Bus Number (e.g., Bus-101)"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          required
          className="w-full p-2 border rounded bg-blue-700 text-white placeholder-white"
        />

        <input
          type="text"
          placeholder="Current Location (e.g., Near Gate 2)"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
          required
          className="w-full p-2 border rounded bg-blue-700 text-white placeholder-white"
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Update Location
        </button>

        {success && <p className="mt-4 text-green-300 text-center">{success}</p>}
      </form>

      {/* Emergency Alerts Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-black text-center">🚨 Send Emergency Alert</h2>

        <form onSubmit={handleAlertSubmit} className="space-y-4">
          <textarea
            placeholder="Type your alert message here..."
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
            required
            className="w-full p-3 border rounded bg-red-700 text-white placeholder-white"
          />

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Send Alert
          </button>

          {alertSuccess && <p className="text-green-400 text-center">{alertSuccess}</p>}
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
