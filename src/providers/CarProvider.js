import { createContext, useState, useEffect, useContext } from "react";
import { baseUrl } from "../APIConfig";

const CarContext = createContext();

export const useCarContext = () => {
    const context = useContext(CarContext);
    return context;
};

const getCars = async () => {
    const result = await fetch(`${baseUrl}/car`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

const getCarById = async (id) => {
    const result = await fetch(`${baseUrl}/car/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

const postCar = async (car) => {
    const form = new FormData();
    for (const [key, value] of Object.entries(car)) {
        form.append(key, value);
    }

    const result = await fetch(`${baseUrl}/car`, {
        method: "POST",
        body: form
    });
    return await result.json();
}

const deleteCar = async (id) => {
    const result = await fetch(`${baseUrl}/car/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

const putCar = async (id, car) => {
    const result = await fetch(`${baseUrl}/car/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(car)
    });
    if (result.ok) {
        return result.status;
    }
    else {
        throw new Error("There was an error with the PUT request. Contact your admin.");
    }
}

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState();

    const findCarById = async (id) => {
        return await getCarById(id);
    }
    const addCar = async (car) => {
        const newCar = await postCar(car);
        setCars(prevValue => ([
            ...prevValue,
            newCar
        ]));
        return newCar;
    }
    const removeCar = async (id) => {
        const deletedCar = await deleteCar(id);
        setCars(prevValue => prevValue.filter(c => c.id !== deletedCar.id));
        return deleteCar;
    }
    const editCar = async (id, car) => {
        const result = await putCar(id, car);
        if (result === 204) {
            const updatedCars = cars.map(c => c.id === Number(id) ? car : c);
            setCars(updatedCars);
        }

        return result;
    }

    useEffect(() => {
        const fetchData = async () => {
            setCars(await getCars());
        }
        fetchData();
    }, []);

    return (
        <CarContext.Provider value={{ cars, findCarById, addCar, removeCar, editCar }}>
            {children}
        </CarContext.Provider>
    );
};