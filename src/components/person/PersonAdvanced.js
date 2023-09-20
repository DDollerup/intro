import { useParams } from "react-router-dom";
import { useIntroContext } from "../../providers/IntroProvider";
import { useEffect, useState } from "react";

const PersonAdvanced = () => {
    const { personId } = useParams();
    const { findPersonById } = useIntroContext();
    const [person, setPerson] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setPerson(await findPersonById(personId));
        }

        fetchData();
    }, [personId]);

    return (
        <>
            <h1>{person?.name}</h1>
        </>
    );
};

export default PersonAdvanced;