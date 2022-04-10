import React from 'react';
import './container.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Camera } from './Camera';
import { Scan } from './Scan';
import { Error } from './Error';

let cedula_trasera = require('./card1.png');
let cedula_delantera = require('./card1.png');

function App() {
    const [useCamera, setUseCamera] = React.useState(false);
    const [image, setImage] = React.useState(cedula_delantera);
    const [imageTrasera, setImagenTrasera] = React.useState(cedula_trasera);
    return (
        <Router>
            <section className="scan">
                {useCamera && (
                    <Camera useCamera={useCamera} setImage={setImage}></Camera>
                )}

                <Switch>
                    <Route
                        path="/:id/:type"
                        children={
                            <Scan
                                setUseCamera={setUseCamera}
                                image={image}
                                setImage={setImage}
                                setImagenTrasera={setImagenTrasera}
                                imageTrasera={imageTrasera}
                            />
                        }
                    />
                    <Route
                        path="/:id/"
                        children={
                            <Scan>
                                <Error />
                            </Scan>
                        }
                    />
                    <Route
                        path="/"
                        children={
                            <Scan>
                                <Error />
                            </Scan>
                        }
                    />
                </Switch>
            </section>
        </Router>
    );
}

export default App;
