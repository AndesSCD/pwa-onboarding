import React from 'react';
import { Cards } from '../Cards';
import { Error } from '../Error';
import { Card } from '../Card';
import { useParams } from 'react-router-dom';
import axios from 'axios';
let image_andes = require('../andes.png');

function Scan({
    setUseCamera,
    image,
    setImage,
    setImagenTrasera,
    imageTrasera,
    setTakePhoto,
    setDirection,
    setIdentification,
    uploadImage,
    uploadImageOne,
}) {
    let { id } = useParams();
    let { type } = useParams();
    let nameCaptureDocument;
    React.useEffect(() => {
        switch (type) {
            case 'CC':
                nameCaptureDocument = 'Capturar cédula';
                setIdentification('cedula');
                break;
            case 'CE':
                nameCaptureDocument = 'Capturar cédula de extranjeria';
                setIdentification('cédula de extranjeria');

                break;
            case 'PAS':
                nameCaptureDocument = 'Capturar pasaporte';
                setIdentification('pasaporte');
                setIdentification('pasaporte');

                break;
            default:
                nameCaptureDocument = 'error';
                break;
        }
    });

    const [list, setList] = React.useState([]);
    React.useEffect(() => {
        axios({
            method: 'GET',
            url: `http://3.85.27.146:5000/api/v1/enrolment/${id}`,
            headers: {
                x_access_token: 'uTKGjgGvK2CAKwkioaLr43h45hdfhdfhDG53Edgsdg',
            },
        })
            .then((data) => {
                setList(data.data[0]);
            })
            .catch((err) => console.log(err));
    }, [list]);

    if (!list) {
        return (
            <article className="scan_container">
                <figure className="andes_img">
                    <img src={image_andes} alt="" />
                </figure>
                <Error error="error" />
            </article>
        );
    }
    if (type === 'CC' || type === 'CE') {
        return (
            <article className="scan_container">
                <figure className="andes_img">
                    <img src={image_andes} alt="" />
                </figure>
                <h3 className="scan_container-title">{nameCaptureDocument}</h3>
                <Cards
                    setUseCamera={setUseCamera}
                    image={image}
                    setImage={setImage}
                    setImagenTrasera={setImagenTrasera}
                    imageTrasera={imageTrasera}
                    setTakePhoto={setTakePhoto}
                    setDirection={setDirection}
                    uploadImage={uploadImage}
                    uploadImageOne={uploadImageOne}
                />
            </article>
        );
    } else if (type === 'PAS') {
        return (
            <article className="scan_container">
                <figure className="andes_img">
                    <img src={image_andes} alt="" />
                </figure>
                <h3 className="scan_container-title">{nameCaptureDocument}</h3>
                <Card />
            </article>
        );
    }
    return (
        <article className="scan_container">
            <figure className="andes_img">
                <img src={image_andes} alt="" />
            </figure>
            <Error error="error" />
        </article>
    );
}
export { Scan };
