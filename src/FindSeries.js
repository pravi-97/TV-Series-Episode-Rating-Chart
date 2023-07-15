import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import myImg from './images/No-Image-Placeholder.png';
const FindSeries = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const value = params.get('value');

    const [sArr, setSArr] = useState([]);
    const [isPending, setIsPending] = useState(true);


    useEffect(() => {
        const lambda = 'https://7t7dzo20f2.execute-api.us-east-1.amazonaws.com/test/?param1=search&param2='

        fetch(lambda + value)
            .then(response => response.json())
            .then(data => {
                setSArr(data);
                setIsPending(false);

            })
            .catch(error => {
                console.log(error);
                setIsPending(false);
            });

    }, [value]);

    return (
        <section id="card-list-section">
            <div className="container">
                <div className="row" id="the-card-list">
                    {isPending ? (
                        <p>Loading...</p>
                    ) : (
                        sArr.map((element) => (
                            <div className="col-md-4 col-sm-12" key={element.id}>
                                <Link to={"/chart?value=" + element.id}>
                                    <div className="mb-5 center-content">
                                        <div className="card card-main">
                                            {element.poster_path === null ? (<img src={myImg} className="card-img-top rounded" alt={`${element.original_name} Poster Unavailable`} />) :
                                            (<img src={`https://image.tmdb.org/t/p/original${element.poster_path}`} className="card-img-top rounded" alt={`${element.original_name} Poster`} />)}
                                            <h5 className="card-title">{element.original_name}</h5>
                                            <p className="card-text">{element.overview}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default FindSeries;
