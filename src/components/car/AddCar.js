import { useState } from "react";
import { useCarContext } from "../../providers/CarProvider";
import InfoModal from "../modal/InfoModal";

const AddCar = () => {
    const { addCar } = useCarContext();
    const [car, setCar] = useState({ model: undefined, brand: undefined, description: undefined, image: null, file: null });
    const [postResult, setPostResult] = useState();

    const handleFormChange = (event) => {
        const name = event.target.name;
        const value =  event.target.name === "file" ? event.target.files[0] : event.target.value;

        setCar(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const handleSubmit = async () => {
            const result = await addCar(car);
            setPostResult(result);
            event.target.reset();
            document.getElementById("infoModalButton").click();
        }
        handleSubmit();
    }

    return (
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="model" className="form-label">Model</label>
                                <input type="text" className="form-control" id="model" name="model" required />
                                <div id="modelHelp" className="form-text">The model of the car</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="brand" className="form-label">Brand</label>
                                <input type="text" className="form-control" id="brand" name="brand" required />
                                <div id="brandHelp" className="form-text">The brand of the car</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" rows={6} required></textarea>
                                <div id="descriptionHelp" className="form-text">The description of the car</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" accept="image/*" id="image" name="file" required />
                                <div id="imageHelp" className="form-text">The image of the car</div>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Save</button>
                        </form>
                    </div>
                </div>
            </section>
            <InfoModal title="Car Added" message={`The car: ${postResult?.brand} ${postResult?.model} with an id: ${postResult?.id} has been added.`} />
        </>
    );
};

export default AddCar;