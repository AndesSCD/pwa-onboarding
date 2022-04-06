import React from 'react';
import './container.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from 'react-router-dom';

// images
let cedula_delantera = require('./card1.png');
let cedula_trasera = require('./card2.png');

function App() {
    return (
        <Router>
            <section className="scan">
                <Switch>
                    <Route path="/:id/:type" children={<Scan />} />
                    <Route path="/:id/:type" children={<Scan />} />
                    <Route path="/" children={<Scan />} />
                </Switch>
            </section>
        </Router>
    );
}

function Scan() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    let { type } = useParams();
    const [image, setImage] = React.useState(cedula_delantera);
    const [imageTrasera, setImagenTrasera] = React.useState(cedula_trasera);
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
    }

    return (
        <article className="scan_container">
            <h3 className="scan_container-title">{nameCaptureDocument}</h3>
            <section className="scan_container-relative">
                <input
                    id="captura1"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) =>
                        setImage(URL.createObjectURL(e.target.files[0]))
                    }
                    className="scan_container-absolute"
                ></input>
                <Delantera img={image} />
            </section>
            <section className="scan_container-relative">
                <input
                    id="captura1"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) =>
                        setImagenTrasera(URL.createObjectURL(e.target.files[0]))
                    }
                    className="scan_container-absolute"
                ></input>
                <Trasera img={imageTrasera} />
            </section>
        </article>
    );
}

function Delantera(props) {
    return (
        <div className="cedula_posterior">
            <figure>
                <img src={props.img} alt="" />
            </figure>
        </div>
    );
}
function Trasera(props) {
    return (
        <div className="cedula_posterior">
            <figure>
                <img src={props.img} alt="" />
            </figure>
        </div>
    );
}

export default App;
