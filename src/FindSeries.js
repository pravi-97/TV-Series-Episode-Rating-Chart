import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const FindSeries = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const value = params.get('value');

    const [sArr, setSArr] = useState([]);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        let url = "https://imdb-api.projects.thetuhin.com/";
        console.log(url + "search?query=" + value);

        fetch(url + "search?query=" + value)
            .then(response => response.json())
            .then(data => {
                console.log('Data Returned ' + data.message);
                const tvSeriesResults = data.results.filter(element => element.type === "tvSeries");

                Promise.all(tvSeriesResults.map(element => (
                    fetch(url + "title/" + element.id)
                        .then(response => response.json())
                )))
                    .then(tvSeriesData => {
                        setSArr(tvSeriesData);
                        setIsPending(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsPending(false);
                    });
            });
    }, [value]);

    return (
        <section id="card-list-section">
            <div className="container">
                <div className="row" id="the-card-list">
                    {isPending ? (
                        <p>Loading...</p>
                    ) : (
                        sArr.map((data) => (
                            <Link to={"/chart?value=" + data.id} key={data.id}>
                                <div className="mb-5 col-md-6 col-sm-12 col-lg-4 center-content">
                                    <div className="card card-main">
                                        <img src={data.image} className="card-img-top rounded" alt="..." />
                                        <h5 className="card-title">{data.title}</h5>
                                        <p className="card-text">{data.plot}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default FindSeries;
