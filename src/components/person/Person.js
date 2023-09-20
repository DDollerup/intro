import { Link } from "react-router-dom";
import { useIntroContext } from "../../providers/IntroProvider";

const Person = () => {
    const { person, allPersons } = useIntroContext();
    return (
        <>
            <h1>Get 1 person</h1>
            <h2>{person?.name}</h2>
            <hr />
            <h1>Get Array of Persons</h1>
            <ul>
                {allPersons?.map(p => (
                    <li>
                        <strong>Name: </strong>{p.name}<br />
                        <strong>Address: </strong>{p.address}<br />
                        <strong>Phone: </strong>{p.phone}<br />
                        <strong>City: </strong>{p.city}<br />
                        <Link to={`/person/advanced/${p.id}`}>Read More</Link>
                    </li>
                ))}
            </ul>
            <hr />
        </>
    );
};

export default Person;