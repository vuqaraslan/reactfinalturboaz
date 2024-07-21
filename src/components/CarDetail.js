import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar, fetchCarById } from "../features/carSlice";
import "./CarDetail.css";

export default function CarDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector((state) => state.cars.car);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id)).catch((err) => console.err(err.message));
    }
  }, [dispatch, id]);

  function handleDeleteClick() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${car.Vendor} ${car.Model}?`
    );
    if (confirmed) {
      dispatch(deleteCar(id));
      navigate("/");
    }
  }


  const handleClick=()=>{
    navigate("/");
  }

  return (
    <>
    <button onClick={handleClick} className="back-btn">Back</button>
      <div className="car-detail">
        <div>
          <h2>
            {car.Mark} {car.Vendor},{car.EngineVolume} L, {car.Year} il,{" "}
            {car.Miles} km
          </h2>
          <div className="image-container">
            {car.Images && car.Images.length > 0 ? (
              <img src={car.Images} alt={car.Mark} />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
        <div className="description">
          <h3>Price: {car.Price} AZN</h3>
          <div
            style={{
              display: "flex",
            }}
          >
            {car.IsCredit && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "white",
                  marginRight: "10px",
                }}
              >
                <img
                  style={{
                    backgroundColor: "#f5a623",
                    marginRight: "3px",
                    padding: "1px",
                  }}
                  className="icons"
                  src="https://turbo.azstatic.com/assets/mobile/sprites/main-58e33429b460b8954f9774b6b79d7d004653d7779037c09449f0a6ca33425359.svg#loan"
                  alt="credit"
                />
                <p style={{ margin: "0", fontSize: "14px" }}>Kredit</p>
              </div>
            )}
            {car.IsBarter && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "white",
                }}
              >
                <img
                  style={{
                    backgroundColor: "rgb(118, 200, 28)",
                    marginRight: "3px",
                    padding: "1px",
                  }}
                  className="icons"
                  src="https://turbo.azstatic.com/assets/mobile/sprites/main-58e33429b460b8954f9774b6b79d7d004653d7779037c09449f0a6ca33425359.svg#barter"
                  alt="barter"
                />
                <p style={{ margin: "0", fontSize: "14px" }}>Barter</p>
              </div>
            )}
          </div>
          <div>
            <p>{car.CarsOwner}</p>
            <p style={{ color: "#8d94ad" }}>{car.City}</p>
            {car.IsCredit && (
              <button className="with-credit">% Hissə-Hissə al</button>
            )}
          </div>
          <button className="phone">
            NUMBER <br />{" "}
            <span style={{ fontSize: "19px"}}>{car.OwnerPhone}</span>
          </button>
        </div>
      </div>
      <div className="carInfo">
        <div className="left">
          <div className="car-statistics">
            <div>
              <p>City : {car.City}</p>
              <p>Marka : {car.Mark}</p>
              <p>Model : {car.Model}</p>
              <p>Graduation year : {car.Year}</p>
            </div>
            <div>
              <p>Engine : {car.EngineVolume}</p>
              <p>Miles : {car.Miles}</p>
              <p>Gear box : {car.GearBox}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <p>{car.Description}</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to={`/update-car/${car.id}`}>
          <button className="edit-btn btn-op">Edit</button>
        </Link>
        <button onClick={handleDeleteClick} className="delete-btn btn-op">
          Delete
        </button>
      </div>
    </>
  );
}
