import CarForm from "../components/CarForm";
import React, { useState } from "react";

export default function NewAnnouncement() {
  const [currentCar, setCurrentCar] = useState(null);
  return (
    <div>
      <CarForm currentCar={currentCar} setCurrentCar={setCurrentCar}></CarForm>
    </div>
  );
}
