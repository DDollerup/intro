import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarProvider } from "./providers/CarProvider";
import Cars from "./components/car/Cars";
import CarDetails from "./components/car/CarDetails";

const App = () => {
  return (
    <BrowserRouter>
      <CarProvider>
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route path="/car/details/:carId" element={<CarDetails />} />
        </Routes>
      </CarProvider>
    </BrowserRouter>
  );
}

export default App;
