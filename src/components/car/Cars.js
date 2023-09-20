import { Link } from "react-router-dom";
import { useCarContext } from "../../providers/CarProvider";
import AddCar from "./AddCar";
import ConfirmationModal from "../modal/ConfirmationModal";
import { useState } from "react";

const Cars = () => {
    const { cars, removeCar } = useCarContext();
    const [carId, setCarId] = useState();

    const handleDeleteItemSelected = (event) => {
        const carId = event.target.dataset.carId;
        setCarId(carId);
        document.getElementById("confirmationModalButton").click();
    }

    const handleDeleteCar = () => {
        const handleDelete = async () => {
            const result = await removeCar(carId);
        }
        handleDelete();
    }

    return (
        <>
            <AddCar />
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Description</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars?.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.brand}</td>
                                <td>{c.model}</td>
                                <td>{c.description}</td>
                                <td>
                                    <Link className="btn btn-outline-primary me-3" to={`/car/details/${c.id}`}>Read More</Link>
                                    <button className="btn btn-outline-danger" data-car-id={c.id} onClick={handleDeleteItemSelected}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ConfirmationModal title="Delete Car" message={`Are you sure you wish to delete the car with an id: ${carId}`} onConfirm={handleDeleteCar} />
        </>
    );
};

export default Cars;