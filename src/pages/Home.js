// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCars } from "../features/carSlice";
import "./Home.css";
import CarFilter from "../components/CarFilter";
import CarList from "../components/CarList";

export default function Home() {
  return (
    <>
      <section>
        <CarFilter />
      </section>
      <CarList />
    </>
  );
}
