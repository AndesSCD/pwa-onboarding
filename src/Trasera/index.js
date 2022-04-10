import React from 'react';

function Trasera({ setUseCamera, img, setTakePhoto }) {
    const openCamera = () => {
        setUseCamera(true);
        setTakePhoto('trasera');
    };
    return (
        <div className="cedula_posterior" onClick={openCamera}>
            <figure>
                <img src={img} alt="identificación parte posterior " />
            </figure>
        </div>
    );
}

export { Trasera };
