import React from 'react';

function Trasera({ setUseCamera, img, setTakePhoto, setDirection }) {
    const openCamera = () => {
        setUseCamera(true);
        setTakePhoto('trasera');
        setDirection('ANVERSO');
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
