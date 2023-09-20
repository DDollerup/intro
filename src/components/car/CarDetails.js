import { useParams } from "react-router-dom";
import { useCarContext } from "../../providers/CarProvider";
import { useEffect, useState } from "react";
import { baseImageUrl } from "../../APIConfig";

const CarDetails = () => {
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
        <section className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <img src={`${baseImageUrl}/${car?.image}`} className="img-fluid" alt="Picture of car" />
                </div>
                <div className="col-md-6">
                    <h1>{`${car?.brand} ${car?.model}`}</h1>
                    <hr />
                    <p>{car?.description}</p>
                </div>
            </div>
        </section>
    );
};

export default CarDetails;