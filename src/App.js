import React, { useEffect } from 'react';
import './container.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from 'react-router-dom';

// images
let cedula_delantera = require('./card1.png');
let cedula_trasera = require('./card2.png');
let image_andes = require('./andes.png');

function App() {
    return (
        <Router>
            <section className="scan">
                <Switch>
                    <Route path="/:id/:type" children={<Scan></Scan>} />
                    <Route
                        path="/:id/"
                        children={
                            <Scan>
                                <Error error="error" />
                            </Scan>
                        }
                    />
                    <Route
                        path="/"
                        children={
                            <Scan>
                                <Error error="error" />
                            </Scan>
                        }
                    />
                </Switch>
            </section>
        </Router>
    );
}

function Scan() {
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
    if (type === 'CC' || type === 'CE') {
        return (
            <article className="scan_container">
                <figure className="andes_img">
                    <img src={image_andes} alt="" />
                </figure>
                <h3 className="scan_container-title">{nameCaptureDocument}</h3>
                <Cards />
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

function Cards() {
    const [image, setImage] = React.useState(cedula_delantera);
    const [imageTrasera, setImagenTrasera] = React.useState(cedula_trasera);
    const [uploadImage, setUploadImage] = React.useState(false);
    const [uploadImageOne, setUploadImageTwo] = React.useState(false);

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
                        console.log(uploadImage, uploadImageOne);
                        setUploadImage(true);
                    }}
                    className="scan_container-absolute"
                ></input>
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
                        setUploadImageTwo(true);
                    }}
                    className="scan_container-absolute"
                ></input>
                <Trasera img={imageTrasera} />

                <button
                    className={`button_next-disable ${
                        uploadImageOne && uploadImage && 'button_next'
                    } button_next-enable`}
                >
                    Enviar
                </button>
            </section>
        </React.Fragment>
    );
}

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

function Delantera(props) {
    return (
        <div className="cedula_posterior">
            <figure>
                <img src={props.img} alt="identificación parte delaantera " />
            </figure>
        </div>
    );
}

function Trasera(props) {
    return (
        <div className="cedula_posterior">
            <figure>
                <img src={props.img} alt="identificación parte posterior " />
            </figure>
        </div>
    );
}

function Error(props) {
    return <div>{props.error}</div>;
}

function SendButton({ canSend }) {
    return <button disabled={canSend}>Enviar</button>;
}

export default App;
