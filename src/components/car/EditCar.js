import { useNavigate, useParams } from "react-router-dom";
import { useCarContext } from "../../providers/CarProvider";
import { useEffect, useState } from "react";
import InfoModal from "../modal/InfoModal";

const EditCar = () => {
    const { carId } = useParams();
    const { findCarById, editCar } = useCarContext();
    const navigate = useNavigate();
    const [car, setCar] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setCar(await findCarById(carId));
        }
        fetchData();
    }, []);

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setCar(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formSubmit = async () => {
            const result = await editCar(carId, car);
            if (result == 204){
                document.getElementById("infoModalButton").click();
            }
        }
        formSubmit();
    }

    const handleInfoModalConfirm = () => {
        navigate("/");
    }

    return (
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="model" className="form-label">Model</label>
                                <input type="text" className="form-control" id="model" name="model" defaultValue={car?.model} required />
                                <div id="modelHelp" className="form-text">The model of the car</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="brand" className="form-label">Brand</label>
                                <input type="text" className="form-control" id="brand" name="brand" defaultValue={car?.brand} required />
                                <div id="brandHelp" className="form-text">The brand of the car</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows={6}
                                    defaultValue={car?.description}
                                    required></textarea>
                                <div id="descriptionHelp" className="form-text">The description of the car</div>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Save</button>
                        </form>
                    </div>
                </div>
            </section>
            <InfoModal title="Car Edited" message={`The car ${car?.brand} ${car?.model} has been edited.`} onConfirm={handleInfoModalConfirm} />
        </>
    );
};

export default EditCar;