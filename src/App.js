import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Provider } from "react-redux";
import { faUser, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { store } from "./app/store";
import NewAnnouncement from "./pages/NewAnnouncement";
import Favorites from "./pages/Favorites";
import CarDetail from "./components/CarDetail";
import UpdateCar from "./pages/UpdateCar";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <header>
            
            <nav className="route-container">
              <ul>
                <li>
                  <Link className="head-route site-name" to="/">
                    SELL-CAR.AZ
                  </Link>
                </li>
                <li>
                  <Link className="head-route favorites" to="/favorites">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link className="head-route announcement" to="/new-car">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      style={{ marginRight: "4px", marginLeft: "2px" }}
                    />{" "}
                    New Announcement
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-car" element={<NewAnnouncement />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/update-car/:id" element={<UpdateCar />} />
            <Route exact path="/cars/:id" element={<CarDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
