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
    const result = await fetch(`${baseUrl}/car`, {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(car)
    });
    return await result.json();
}

const deleteCar = async (id) => {
    const result = await fetch(`${baseUrl}/car/${id}`,{
        method:"DELETE",
        headers: {
            "content-type":"application/json; charset=utf-8"
        }
    });
    return await result.json();
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

    useEffect(() => {
        const fetchData = async () => {
            setCars(await getCars());
        }
        fetchData();
    }, []);

    return (
        <CarContext.Provider value={{ cars, findCarById, addCar, removeCar }}>
            {children}
        </CarContext.Provider>
    );
};