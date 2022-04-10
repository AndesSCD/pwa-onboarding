import React from 'react';
import { Delantera } from '../Delantera';
import { Trasera } from '../Trasera';
import axios from 'axios';
let cedula_trasera = require('../card2.png');
let cedula_delantera = require('../card1.png');

function Cards() {
    const [image, setImage] = React.useState(cedula_delantera);
    const [imageTrasera, setImagenTrasera] = React.useState(cedula_trasera);
    const [uploadImage, setUploadImage] = React.useState(false);
    const [uploadImageOne, setUploadImageTwo] = React.useState(false);
    const [visibility, setVisibility] = React.useState('open_camera-none');
    let [uploadImageU, setUploadImageU] = React.useState('');
    let [uploadImageUb, setUploadImageUb] = React.useState('');
    function sendData() {
        let imagen1 = document.getElementById('captura1');
        let imagen2 = document.getElementById('captura2');
        let formData = new FormData();
        formData.append('image_front', uploadImageU);
        formData.append('image_back', uploadImageUb);
        console.log(formData);
        axios({
            method: 'POST',
            url: 'http://3.85.27.146:5000/api/v1/enrolment/abcdefg',
            data: formData,
            headers: {
                x_access_token: 'uTKGjgGvK2CAKwkioaLr43h45hdfhdfhDG53Edgsdg',
            },
        })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    return (
        <React.Fragment>
            {/* <OpenCamera
                image={image}
                setImage={setImage}
                isVisible={'visibility'}
            ></OpenCamera> */}
            <section className="scan_container-relative">
                <label htmlFor="captura1">Delantera</label>
                {/* <input
                    id="captura1"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => {
                        setImage(URL.createObjectURL(e.target.files[0]));
                        let formData = new FormData();
                        formData.append('image_front', e.target.files[0]);
                        setUploadImageU(e.target.files[0]);
                        // axios({
                        //     method: 'POST',
                        //     url: 'http://3.85.27.146:5000/api/v1/enrolment/abcdefg',
                        //     data: formData,
                        //     headers: {
                        //         x_access_token:
                        //             'uTKGjgGvK2CAKwkioaLr43h45hdfhdfhDG53Edgsdg',
                        //     },
                        // })
                        //     .then((data) => console.log(data))
                        //     .catch((err) => console.log(err));
                        // console.log(uploadImage, uploadImageOne);
                        setUploadImage(true);
                    }}
                    className="scan_container-absolute"
                ></input> */}
                <Delantera img={image} />
            </section>
            <section className="scan_container-relative">
                <label htmlFor="captura2">Trasera</label>
                <input
                    id="captura2"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => {
                        setImagenTrasera(
                            URL.createObjectURL(e.target.files[0])
                        );
                        setUploadImageUb(e.target.files[0]);
                        setUploadImageTwo(true);
                    }}
                    className="scan_container-absolute"
                ></input>
                <Trasera img={imageTrasera} />

                <button
                    className={`button_next-disable ${
                        uploadImageOne && uploadImage && 'button_next'
                    } button_next-enable`}
                    onClick={sendData}
                >
                    Enviar
                </button>
            </section>
        </React.Fragment>
    );
}
export { Cards };
