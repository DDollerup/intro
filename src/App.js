import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarProvider } from "./providers/CarProvider";
import Cars from "./components/car/Cars";
import CarDetails from "./components/car/CarDetails";
import EditCar from "./components/car/EditCar";

const App = () => {
  return (
    <BrowserRouter>
      <CarProvider>
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route path="/car/details/:carId" element={<CarDetails />} />
          <Route path="/car/edit/:carId" element={<EditCar />} />
        </Routes>
      </CarProvider>
    </BrowserRouter>
  );
}

export default App;
