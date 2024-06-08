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
    const [selectedRadio, setSelectedRadio] = useState('tmdb');

    useEffect(() => {
        const lambda = 'https://evnybizsck.execute-api.ap-south-1.amazonaws.com/prod?param1=search&param2='

        fetch(lambda + value)
            .then(response => response.json())
            .then(data => {
                setSArr(data);
                setIsPending(false);
                window.location.href = '#card-list-section';
            })
            .catch(error => {
                console.log(error);
                setIsPending(false);
            });
    }, [value]);

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value); 
    };
    return (
        <section id="card-list-section">
            <div className="container text-center">
                <div className="radios" id="radios">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="tmdbRadio"
                            value="tmdb"
                            checked={selectedRadio === 'tmdb'} 
                            onChange={handleRadioChange} 
                        />
                        <label className="form-check-label" htmlFor="tmdbRadio">
                            TMDB
                        </label>
                    </div>
                    <div className="form-check form-check-inline" title="IMDb API is not available yet!">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="imdbRadio"
                            value="imdb"
                            checked={selectedRadio === 'imdb'} 
                            onChange={handleRadioChange}
                            disabled
                        />
                        <label className="form-check-label" htmlFor="imdbRadio">
                            IMDb
                        </label>
                    </div>
                </div>
                <div className="row" id="the-card-list">
                    {isPending ? (
                        <p>Loading...</p>
                    ) : (
                        sArr.map((element) => (
                            <div className="col-md-3 col-sm-6" key={element.id}>
                                <Link to={"/chart?value=" + element.id + "&api=" + selectedRadio}>
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