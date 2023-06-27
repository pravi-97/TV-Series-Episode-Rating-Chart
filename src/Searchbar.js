import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SearchBar = () => {
    let [title, setTitle] = useState('Hello');
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();       
        const regex = /^tt\d+$/;
        title = (title.trim()).toString();
        if (regex.test(title)) {
           console.log("Title: " +title);
            history.push(`/chart?value=${encodeURIComponent(title)}`)
        } else {
            console.log("Query: " + title);
            history.push(`/find?value=${encodeURIComponent(title)}`)
        }
    }

    return (
        <section id="search-section">
            <br/>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="search-heading">Enter IMdb ID or Search for a Series</div>
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