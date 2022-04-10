import React from 'react';

function Delantera({ setUseCamera, img, setTakePhoto }) {
    const openCamera = () => {
        setUseCamera(true);
        setTakePhoto('delantera');
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
