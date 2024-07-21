import React, { useEffect, useState } from "react";
import "./CarFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter,setAllCarsOfInHome } from "../features/carSlice";
import { faCommentDollar, faDiagramPredecessor } from "@fortawesome/free-solid-svg-icons";
import { all } from "axios";

export default function CarFilter() {
  const carVendors = [
    "Toyota",
    "BMW",
    "Porsche",
    "Ford",
    "Chevrolet",
    "Honda",
    "Nissan",
    "Audi",
    "Mercedes-Benz",
    "Volkswagen",
    "Subaru",
    "Lexus",
    "Mazda",
    "Hyundai",
    "Kia",
    "Volvo",
    "Jeep",
    "Tesla",
    "Ferrari",
    "Lamborghini",
    "Bugatti",
    "Land_Rover"
  ];

  const carModels = {
    Bugatti:["Veyron"],
    Land_Rover:["Range Rover"],
    Toyota: ["Camry", "Corolla", "Rav4", "Highlander", "Prius", "Land Cruiser"],
    BMW: ["X5", "3 Series", "X3", "7 Series", "X1", "5 Series"],
    Porsche: ["911", "Cayenne", "Panamera", "Macan", "Boxster", "Taycan"],
    Ford: ["Mustang", "F-150", "Escape", "Explorer", "Focus", "Edge"],
    Chevrolet: [
      "Silverado",
      "Tahoe",
      "Malibu",
      "Equinox",
      "Camaro",
      "Traverse",
    ],
    Honda: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey", "Fit"],
    Nissan: ["Altima", "Maxima", "Rogue", "Sentra", "Pathfinder", "Frontier"],
    Audi: ["A4", "Q5", "A3", "Q7", "A6", "Q3","R8"],
    "Mercedes-Benz": [
      "C-Class",
      "E-Class",
      "GLC",
      "S-Class",
      "G-Class",
      "A-Class",
    ],
    Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Arteon"],
    Subaru: ["Outback", "Forester", "Impreza", "Crosstrek", "Legacy", "Ascent"],
    Lexus: ["RX", "IS", "NX", "ES", "LS", "GX"],
    Mazda: ["CX-5", "Mazda3", "CX-9", "MX-5", "Mazda6", "CX-30"],
    Hyundai: ["Sonata", "Tucson", "Santa Fe", "Elantra", "Kona", "Palisade"],
    Kia: ["Sorento", "Optima", "Sportage", "Telluride", "Forte", "Soul"],
    Volvo: ["XC90", "XC60", "S60", "V90", "XC40", "S90"],
    Jeep: [
      "Grand Cherokee",
      "Wrangler",
      "Cherokee",
      "Compass",
      "Renegade",
      "Gladiator",
    ],
    Tesla: [
      "Model S",
      "Model 3",
      "Model X",
      "Model Y",
      "Roadster",
      "Cybertruck",
    ],
    Ferrari: [
      "488 GTB",
      "812 Superfast",
      "F8 Tributo",
      "Portofino",
      "SF90 Stradale",
      "Roma",
    ],
    Lamborghini: [
      "Huracan",
      "Aventador",
      "Urus",
      "Sian",
      "Centenario",
      "Diablo",
    ],
  };

  const azerbaijaniCities = [
    "Baki",
    "Ganja",
    "Sumqayit",
    "Lankaran",
    "Mingachevir",
    "Sheki",
    "Shirvan",
    "Gabala",
    "Khachmaz",
    "Zagatala",
    "Guba",
    "Naftalan",
    "Agdam",
    "Agjabadi",
    "Khirdalan",
    "Yevlakh",
    "Bilasuvar",
    "Gazakh",
    "Tovuz",
  ];

  const [filterData, setFilterData] = useState({
    vendor: "",
    model: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    // minYear: "",
    // maxYear: "",
  });

  const dispatch = useDispatch();
  const allCars=useSelector((state)=>state.cars.cars);
  const allCarsSecond=useSelector((state)=>state.cars.cars);

  // const filteredCars = useSelector((state) => state.cars.filter);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };


  const handleFilterClick = () => {
    // console.log(allCars);
    // console.log(filterData);
    console.log(filterData.vendor.length);
    if(filterData.vendor.length>0){
      const checkData=allCars.filter((car)=>car.Mark===filterData.vendor && car.Model===filterData.model
      && (car.Price>=filterData.minPrice && car.Price<=filterData.maxPrice)
    );
    console.log(checkData);
    dispatch(setAllCarsOfInHome(checkData));
  }
  else{
    dispatch(setAllCarsOfInHome(allCarsSecond));
    console.log('entered');
    console.log(allCarsSecond);
    }
  };

  return (
    <div className="filters" style={{ padding: "0" }}>
      <select name="vendor" value={filterData.vendor} onChange={handleChange}>
        <option value="">Vendor</option>
        {carVendors.map((vendor, index) => (
          <option key={index} value={vendor}>
            {vendor}
          </option>
        ))}
      </select>
      <select
        name="model"
        value={filterData.model}
        onChange={handleChange}
        disabled={!filterData.vendor}
      >
        <option value="">Model</option>
        {filterData.vendor && carModels[filterData.vendor] ? (
          carModels[filterData.vendor].map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))
        ) : (
          <option disabled={!filterData.vendor}>First Select Brand</option>
        )}
      </select>
      <select name="city" value={filterData.city} onChange={handleChange}>
        <option value="">City</option>
        {azerbaijaniCities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div className="price-range">
        <input
          name="minPrice"
          type="number"
          value={filterData.minPrice}
          onChange={handleChange}
          placeholder="min. price"
          min="0"
        />
        <input
          name="maxPrice"
          type="number"
          value={filterData.maxPrice}
          onChange={handleChange}
          placeholder="max. price"
          min="0"
        />
      </div>  

      <div className="price-range">
        <input
          name="minYear"
          type="number"
          value={filterData.minYear}
          onChange={handleChange}
          placeholder="min. year"
          min="0"
        />
        <input
          name="maxYear"
          type="number"
          value={filterData.maxYear}
          onChange={handleChange}
          placeholder="max. year"
          min="0"
        />
      </div>

      <button onClick={handleFilterClick} className="filter-btn">
       Show Announcements
      </button>
    </div>
  );
}
