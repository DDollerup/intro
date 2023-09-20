import { useState, useEffect, useContext, createContext } from "react";

const baseUrl = "https://localhost:7225/api";

const IntroContext = createContext();

export const useIntroContext = () => {
    const context = useContext(IntroContext);
    return context;
}

const getPerson = async () => {
    const result = await fetch(`${baseUrl}/intro`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

const getAllPersons = async () => {
    const result = await fetch(`${baseUrl}/intro/getall`, {
        method: "GET",
        headers: {
            "content-type": "application/data; charset=utf-8"
        }
    });
    return await result.json();
}

const getPersonById = async (id) => {
    const result = await fetch(`${baseUrl}/intro/${id}`, {
        method: "GET",
        headers:{
            "content-type":"application/json; charset=utf-8"
        }
    });

    return await result.json();
}

export const IntroProvider = ({ children }) => {
    const [person, setPerson] = useState();
    const [allPersons, setAllPersons] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setPerson(await getPerson());
            setAllPersons(await getAllPersons());
        }
        fetchData();
    }, []);

    const findPersonById = async (id) => {
        return await getPersonById(id);
    }

    return (
        <IntroContext.Provider value={{ person, allPersons, findPersonById }}>
            {children}
        </IntroContext.Provider>
    )
}