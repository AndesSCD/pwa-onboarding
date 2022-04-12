import React from 'react';
import { Delantera } from '../Delantera';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

let cedula_delantera = require('../card1.png');

function Card({
    setUseCamera,
    setImage,
    image,
    setImagenTrasera,
    imageTrasera,
    setTakePhoto,
    setDirection,
    uploadImage,
    uploadImageOne,
}) {
    let { id } = useParams();
    let [uploadImageU, setUploadImageU] = React.useState('');
    let [uploadImageUb, setUploadImageUb] = React.useState('');
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let newImage = new File([u8arr], filename, { type: mime });
        let formData = new FormData();
        formData.append('image_front', newImage);

        return new File([u8arr], filename, { type: mime });
    }
    async function sendData() {
        let imagen1 = document.getElementById('captura1').src;
        let imagen2 = document.getElementById('captura2').src;
        let convert1 = dataURLtoFile(imagen1, 'image_front.png');
        let convert2 = dataURLtoFile(imagen2, 'image_back.png');
        let formData = new FormData();
        formData.append('image_front', convert1);
        formData.append('image_back', convert2);
        console.log(id);
        await axios({
            method: 'POST',
            url: `http://3.85.27.146:5000/api/v1/enrolment/${id}`,
            data: formData,
            headers: {
                x_access_token: 'uTKGjgGvK2CAKwkioaLr43h45hdfhdfhDG53Edgsdg',
            },
        })
            .then((data) =>
                Swal.fire({
                    title: 'Imagen cargada con exito',
                    text: 'Continua en la plataforma web',
                    icon: 'success',
                    confirmButtonText: 'Continuar en la plataforma web',
                    confirmButtonColor: '#004777',
                }).then(() => {
                    window.location.replace('https://www.wikipedia.com');
                })
            )
            .catch((err) =>
                Swal.fire({
                    title: 'Error inesperado',
                    text: 'Intentalo de nuevo',
                    icon: 'error',
                    confirmButtonText: 'Reintentar',
                    confirmButtonColor: '#004777',
                })
            );
    }

    return (
        <React.Fragment>
            <section className="scan_container-relative">
                <label htmlFor="captura1">Delantera</label>
                <Delantera
                    img={image}
                    setUseCamera={setUseCamera}
                    setTakePhoto={setTakePhoto}
                    setDirection={setDirection}
                />
                <button
                    className={`button_next-disable ${
                        uploadImageOne && 'button_next'
                    } button_next-enable`}
                    onClick={sendData}
                >
                    Enviar
                </button>
            </section>
        </React.Fragment>
    );
}

export { Card };
