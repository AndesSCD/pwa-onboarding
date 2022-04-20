import React from 'react';

function Delantera({
    setUseCamera,
    img,
    setTakePhoto,
    setDirection,
    uploadImage,
}) {
    const openCamera = () => {
        setUseCamera(true);
        setTakePhoto('delantera');
        setDirection('FRENTE');
    };
    return (
        <div
            className={`cedula_posterior ${
                uploadImage && 'cedula_posterior-hidden'
            }`}
            onClick={openCamera}
        >
            <figure>
                <img
                    src={img}
                    alt="identificación parte delaantera "
                    id="captura1"
                />
            </figure>
        </div>
    );
}

export { Delantera };
