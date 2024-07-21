import React, { useEffect, useState } from "react";
import "./UpdateCar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateCar, fetchCarById } from "../features/carSlice";

export default function UpdateCar() {
  const validatePhone = (phone) => {
    const phoneRegex = /^(?:050|051|055|070|077|099|012|010)\d{7}$/;
    return phoneRegex.test(phone);
  };

  const navigation = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const car = useSelector((state) => state.cars.car);
  const [formData, setFormData] = useState({
    Mark: "",
    Model: "",
    Year: "",
    Price: "",
    EngineVolume: "",
    GearBox: "",
    Description: "",
    Miles: "",
    City: "",
    CarsOwner: "",
    OwnerPhone: "",
    Images: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id)).catch((err) => console.err(err.message));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (car) {
      setFormData(car);
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validatePhone(formData.OwnerPhone)) {
      newErrors.OwnerPhone = "Invalid phone number format";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    dispatch(updateCar({ id, car: formData }));
    navigation(`/cars/${car.id}`);
  };
  const handleClick=()=>{
    navigation("/");
  }
  return (

    <>
   <button onClick={handleClick} className="back-btn">Back</button> 


    <form onSubmit={handleSubmit} className="car-form">
      <div className="form-left">
        <input
          required
          name="Mark"
          value={formData.Mark}
          onChange={handleChange}
          placeholder="Marka"
        />
        <input
          required
          name="Model"
          value={formData.Model}
          onChange={handleChange}
          placeholder="Model"
        />
        <input
          required
          name="Year"
          value={formData.Year}
          onChange={handleChange}
          placeholder="Year"
        />
        <input
          required
          name="Price"
          value={formData.Price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          required
          name="EngineVolume"
          value={formData.EngineVolume}
          onChange={handleChange}
          placeholder="Engine Volume"
        />
        <input
          required
          name="GearBox"
          value={formData.GearBox}
          onChange={handleChange}
          placeholder="Gear Box"
        />
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>
      <div className="form-right">
        <input
          required
          name="Miles"
          value={formData.Miles}
          onChange={handleChange}
          placeholder="Miles"
        />
        <input
          required
          name="City"
          value={formData.City}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          required
          name="CarsOwner"
          value={formData.CarsOwner}
          onChange={handleChange}
          placeholder="Cars Owner"
        />
        <input
          required
          name="OwnerPhone"
          value={formData.OwnerPhone}
          onChange={handleChange}
          placeholder="Owner Phone"
        />
        {errors.OwnerPhone && <p className="error">{errors.OwnerPhone}</p>}
        <input
          required
          name="Images"
          value={formData.Images}
          onChange={handleChange}
          placeholder="Image URLs"
        />
        <div>
          <button type="submit" style={{backgroundColor:'green'}}>Update Car</button>
        </div>
      </div>
    </form>

    </>
  );
}
