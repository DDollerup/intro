import { useParams } from "react-router-dom";
import { useCarContext } from "../../providers/CarProvider";
import { useEffect, useState } from "react";

const EditCar = () => {
    const { carId } = useParams();
    const { findCarById } = useCarContext();
    const [car, setCar] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setCar(await findCarById(carId));
        }
        fetchData();
    }, []);

    return (
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form>
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
        </>
    );
};

export default EditCar;