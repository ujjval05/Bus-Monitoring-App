import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Dashboard from './Pages/Home';
import TrackBus from './Pages/TrackBus';
import StudentCheckIn from './Pages/CheckIn';
import Notifications from './Pages/Alerts';
import AdminPanel from './Pages/Admin';
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';

import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function App() {
  useEffect(() => {
    const testFirebase = async () => {
      try {
        await addDoc(collection(db, 'testCollection'), {
          test: 'Firebase is working!',
          timestamp: new Date(),
        });

        const snapshot = await getDocs(collection(db, 'testCollection'));
        snapshot.forEach(doc => {
          console.log("Fetched from Firestore:", JSON.stringify(doc.data(), null, 2));
        });
      } catch (error) {
        console.error('Firebase test failed:', error);
      }
    };

    testFirebase();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <div className="w-full max-w-md">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/track" element={<TrackBus />} />
            <Route path="/checkin" element={<StudentCheckIn />} />
            <Route path="/alerts" element={<Notifications />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
