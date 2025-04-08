// src/Pages/CheckIn.jsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function StudentCheckIn() {
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [busId, setBusId] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "checkins"), {
        studentName,
        rollNo,
        busId,
        timestamp: Timestamp.now()
      });

      setSuccess("Check-in successful ✅");
      setStudentName("");
      setRollNo("");
      setBusId("");
    } catch (error) {
      console.error("Error during check-in:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">🚌 Student Check-In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
          className="w-full p-2 bg-blue-800 text-white border border-blue-500 rounded placeholder-white"
        />

        <input
          type="text"
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
          className="w-full p-2 bg-blue-800 text-white border border-blue-500 rounded placeholder-white"
        />

        <input
          type="text"
          placeholder="Bus ID"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          required
          className="w-full p-2 bg-blue-800 text-white border border-blue-500 rounded placeholder-white"
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Check In
        </button>
      </form>

      {success && <p className="mt-4 text-green-300 text-center">{success}</p>}
    </div>
  );
}

export default StudentCheckIn;
