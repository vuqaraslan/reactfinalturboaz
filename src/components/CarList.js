import React, { useEffect, useState } from "react";
import "./CarList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../features/carSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function CarList() {

  /*
  
    const cars = useSelector((state) => state.cars.cars);
  const isLoading=useSelector((state)=>state.cars.loading);
  const dispatch = useDispatch();


  const [likedCars, setLikedCars] = useState(() => {
    const savedLikedCars = Cookies.get("likedCars");
    return savedLikedCars ? JSON.parse(savedLikedCars) : [];
  });

// const FetchAllCars=()=>{
//   useEffect(()=>{
//     dispatch(fetchCars());
//   },[]);
// }

  useEffect(() => {
    // //FetchAllCars();
    // dispatch(setLoading(true));
    // setTimeout(() => {
    //   dispatch(setLoading(false));
    //   dispatch(fetchCars());
    // }, 2000);
    
    dispatch(fetchCars());

    Cookies.set("likedCars", JSON.stringify(likedCars), { expires: 1 });
  }, [dispatch, likedCars]);

  */

  const isLoading=useSelector((state)=>state.cars.loading);


  const cars = useSelector((state) => state.cars.cars);
  const dispatch = useDispatch();

  const [likedCars, setLikedCars] = useState(() => {
    const savedLikedCars = Cookies.get("likedCars");
    return savedLikedCars ? JSON.parse(savedLikedCars) : [];
  });

  useEffect(() => {
    dispatch(fetchCars());
    Cookies.set("likedCars", JSON.stringify(likedCars), { expires: 1 });
  }, [dispatch, likedCars]);

  const toggleLike = (id) => {
    if (likedCars.includes(id)) {
      setLikedCars(likedCars.filter((carId) => carId !== id));
    } else {
      setLikedCars([...likedCars, id]);
    }
  };

  return (
    <>


    <section className="cars" >
      <ul>
        {cars.map((car) => (
          <li className="car" key={car.id}>
            <FontAwesomeIcon
              onClick={() => toggleLike(car.id)}
              icon={faHeart}
              className={`heart-icon ${
                likedCars.includes(car.id) ? "liked" : ""
              }`}
            />
            <Link style={{ textDecoration: "none" }} to={`/cars/${car.id}`}>
              {car.Images && car.Images.length > 0 && (
                <img src={car.Images} alt="car" />
              )}
              <div>
                <h3>{car.Price} AZN</h3>
                <p
                  style={{
                    lineHeight: "19px",
                    margin: "3px 0",
                  }}
                >
                  {car.Mark} {car.Model}
                </p>
                <div className="texts">
                  <p>{car.Year},</p>
                  <p> {car.EngineVolume} L, </p>
                  <p>{car.Miles} km</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>

    {/* <aside>
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/cart-is-empty-2100980-1763838.png?f=webp" 
              alt="aside-banner" style={{float:'left',width:'10%'}}></img>
            </aside> */}

    </>
  );
}
