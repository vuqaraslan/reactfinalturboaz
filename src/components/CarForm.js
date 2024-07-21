import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { addCar } from "../features/carSlice";
import "./CarForm.css";
import { useNavigate } from "react-router";

export default function CarForm({ currentCar, setCurrentCar }) {
  const navigate = useNavigate();
  const validatePhone = (phone) => {
    const phoneRegex = /^(?:050|051|055|070|077|099|012|010)\d{7}$/;
    return phoneRegex.test(phone);
  };

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    Mark: "",
    Model: "",
    Year: "",
    Price: "",
    EngineVolume: "",
    GearBox: "",
    BanType: "",
    Description: "",
    Miles: "",
    City: "",
    IsCredit: "",
    IsBarter: "",
    CarsOwner: "",
    OwnerPhone: "",
    Images: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentCar) {
      setFormData(currentCar);
    }
  }, [currentCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    dispatch(addCar(formData));

    setFormData({
      Mark: "",
      Model: "",
      Year: "",
      Price: "",
      EngineVolume: "",
      GearBox: "",
      BanType: "",
      Description: "",
      Miles: "",
      City: "",
      IsCredit: "",
      IsBarter: "",
      CarsOwner: "",
      OwnerPhone: "",
      Images: ["", ""],
    });
    setCurrentCar(null);
  };

  const handleClick=()=>{
    navigate("/");
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
          placeholder="OwnerPhone"
        />
        {errors.OwnerPhone && <p className="error">{errors.OwnerPhone}</p>}
        <input
          required
          name="Images"
          value={formData.Images}
          onChange={handleChange}
          placeholder="Image"
        />

        <div>
          <button type="submit" style={{backgroundColor:'darkorange'}}>Add Car</button>
        </div>
      </div>
    </form>

    </>
  );
}
