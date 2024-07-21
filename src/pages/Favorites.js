import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "../components/CarList.css";
import { Link, useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();

  const [favCars, setFavCars] = useState(() => {
    const savedCars = Cookies.get("likedCars");
    return savedCars ? JSON.parse(savedCars) : [];
  });

  const cars = useSelector((state) => state.cars.cars);

  const favoriteCarDetails = cars.filter((car) => favCars.includes(car.id));

  useEffect(() => {
    Cookies.set("likedCars", JSON.stringify(favCars));
  });

  const toggleLike = (id) => {
    const updatedFavCars = favCars.includes(id)
      ? favCars.filter((carId) => carId !== id)
      : [...favCars, id];

    setFavCars(updatedFavCars);
  };

  const emptyFavoritesStyle = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "50px",
  };

  const favoritesStyle = {
    textAlign: "center",
    marginTop: "50px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  
  const handleClick=()=>{
    navigate("/");
  }

  return (
    <>
   <button onClick={handleClick} className="back-btn">Back</button> 
    
    <div
      style={
        favoriteCarDetails.length === 0 ? emptyFavoritesStyle : favoritesStyle
      }
    >
      {favoriteCarDetails.length === 0 ? (
        <>
         <p style={{backgroundColor:'deepskyblue',width:'70%',margin:'0px auto',color:'white',padding:'20px 30px',
          borderRadius:'20px'
         }}>
          Click on the heart icon of the car you want to save.
          </p>
          <img
            style={{
              alignSelf: "center",
              marginTop: "130px",
              marginBottom: "27px",
            }}
            src="https://cdni.iconscout.com/illustration/premium/thumb/cart-is-empty-2100980-1763838.png?f=webp"
            alt="empty favorites"
          />
        </>
      ) : (
        <ul className="car-list">
          {favoriteCarDetails.map((car) => (
            <li className="car" key={car.id}>
              <FontAwesomeIcon
                onClick={() => toggleLike(car.id)}
                icon={faHeart}
                className={`heart-icon ${
                  favCars.includes(car.id) ? "liked" : ""
                }`}
              />
              <Link style={{ textDecoration: "none" }} to={`/cars/${car.id}`}>
                {car.Images && car.Images.length > 0 && (
                  <img src={car.Images} alt="car" />
                )}
                <div>
                  <h3>{car.Price}</h3>
                  <p
                    style={{
                      lineHeight: "19px",
                      margin: "3px 0",
                    }}
                  >
                    {car.Mark} {car.Model}
                  </p>
                  <div className="texts">
                    <p>{car.Year}</p>
                    <p>{car.EngineVolume}</p>
                    <p>{car.Miles}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>

    </>
  );
}
