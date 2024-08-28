import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import Departments from './Departments';
import EventsAndActivities from './EventsAndActivities';
import Media from './Media';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/events-activities" element={<EventsAndActivities />} />
            <Route path="/media" element={<Media />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;