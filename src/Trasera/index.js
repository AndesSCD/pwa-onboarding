import React from 'react';

function Trasera(props) {
    return (
        <div className="cedula_posterior">
            <figure>
                <img src={props.img} alt="identificación parte posterior " />
            </figure>
        </div>
    );
}

export { Trasera };
