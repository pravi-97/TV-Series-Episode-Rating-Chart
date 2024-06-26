import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';

const SearchBar = () => {
    let [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/find?value=${encodeURIComponent(title)}`);
    }

    return (
        <section id="search-section">
            <Link to={"/"} style={{fontWeight: "bolder", fontSize: "24px", color: "black", textDecoration: "none"}}>HOME</Link>
            <br />
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-12">
                        <div id="search-heading">Enter the name of the Series</div>
                        <form onSubmit={handleSubmit} method="post">
                            <div id="search-bar" className="align-top">
                                <span className="btn-search" id="btn-search" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                    </svg>
                                </span>
                                <input id="sName" name="sNAme"
                                    type='text'
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <button id="find">Find</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;