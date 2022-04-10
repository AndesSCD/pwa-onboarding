import React from 'react';

function Delantera({ setUseCamera, img }) {
    const openCamera = () => {
        setUseCamera(true);
    };
    return (
        <div className="cedula_posterior" onClick={openCamera}>
            <figure>
                <img src={img} alt="identificación parte delaantera " />
            </figure>
        </div>
    );
}

export { Delantera };
