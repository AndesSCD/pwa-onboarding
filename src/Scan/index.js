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
}) {
    let { id } = useParams();
    let { type } = useParams();
    let nameCaptureDocument;
    switch (type) {
        case 'CC':
            nameCaptureDocument = 'Capturar cédula';
            break;
        case 'CE':
            nameCaptureDocument = 'Capturar cédula de extranjeria';
            break;
        case 'PAS':
            nameCaptureDocument = 'Capturar pasaporte';
            break;
        default:
            nameCaptureDocument = 'error';
            break;
    }
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
