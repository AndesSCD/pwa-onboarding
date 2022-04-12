import React from 'react';

function Delantera({ setUseCamera, img, setTakePhoto, setDirection }) {
    const openCamera = () => {
        setUseCamera(true);
        setTakePhoto('delantera');
        setDirection('FRENTE');
    };
    return (
        <div className="cedula_posterior" onClick={openCamera}>
            <figure>
                <img src={img} alt="identificación parte delaantera " id="captura1" />
            </figure>
        </div>
    );
}

export { Delantera };
