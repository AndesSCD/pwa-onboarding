import React from 'react';
import { Delantera } from '../Delantera';
let cedula_delantera = require('../card1.png');

function Card() {
    const [image, setImage] = React.useState(cedula_delantera);
    const [uploadImage, setUploadImage] = React.useState(false);

    return (
        <React.Fragment>
            <section className="scan_container-relative">
                <label htmlFor="captura1">Delantera</label>
                <input
                    id="captura1"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => {
                        setImage(URL.createObjectURL(e.target.files[0]));
                        setUploadImage(true);
                    }}
                    className="scan_container-absolute"
                ></input>
                <Delantera img={image} />
                <button
                    className={`button_next-disable ${
                        uploadImage && 'button_next'
                    } button_next-enable`}
                >
                    Enviar
                </button>
            </section>
        </React.Fragment>
    );
}

export { Card };
