import React from 'react';

function Delantera(props) {
    return (
        <div className="cedula_posterior">
            <figure>
                <img src={props.img} alt="identificación parte delaantera " />
            </figure>
        </div>
    );
}

export { Delantera };
