import React, { useState } from 'react';

const UpArrow = () => {
    const [isBouncing, setIsBouncing] = useState(false);

    const addBounce = () => {
        setIsBouncing(true);
    };

    const removeBounce = () => {
        setIsBouncing(false);
    };

    const goToTop = () => {
        window.location.href = '#search-section';
    };

    return (
        <div id="up-arrow-container">
            <div
                id="go-to-top"
                onMouseEnter={addBounce}
                onMouseLeave={removeBounce}
                onClick={goToTop}
            >
                <i
                    id="top-arrow"
                    className={`fa-solid fa-arrow-up ${isBouncing ? 'fa-bounce' : ''}`}
                ></i>
            </div>
        </div>
    );
};

export default UpArrow;