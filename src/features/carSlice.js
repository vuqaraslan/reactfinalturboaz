import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:27099",
});

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await api.get("/cars");
  return response.data;
});

export const addCar = createAsyncThunk("cars/addCar", async (car) => {
  const response = await api.post("/cars", car);
  return response.data;
});

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async ({ id, car }) => {
    const response = await api.put(`/cars/${id}`, car);
    return response.data;
  }
);

export const deleteCar = createAsyncThunk("cars/deleteCar", async (id) => {
  var response = await api.delete(`/cars/${id}`);
  return response.data;
});

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    reserveCars:[],
    car: {},
    loading: false,
    error: null,
    filter:{
      vendor:'',
      model: '',
      city: '',
    }
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setLoading:(state,action)=>{
        state.loading=action.payload;
    },
    setAllCarsOfInHome:(state,action)=>{
      state.cars=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.car = action.payload;
        state.loading = false;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(
          (car) => car.id === action.payload.id
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload.id);
      });
  },
});

export const { setFilter,setLoading,setAllCarsOfInHome } = carSlice.actions;

export default carSlice.reducer;
