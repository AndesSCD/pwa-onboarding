import React from 'react';
import ReactDOM from 'react-dom';
import './camera.css';

import cedula from '../cedula.svg';
import trasera from '../trasera.svg';
import back from '../arrow_back_white_24dp.svg';
import reverse from '../change_circle_white_24dp.svg';
import Swal from 'sweetalert2';

function Camera(props) {
    let useCamera = props.useCamera;
    let [here, setHere] = React.useState(0);
    let [directionCamera, setDirectionCamera] = React.useState(false);
    function changeDirection(limit) {
        setHere(++here);
        console.log(here);
    }
    let credencial = cedula;
    if (props.direction !== 'FRENTE') {
        credencial = trasera;
    }
    const changeCamera = () => {
        setDirectionCamera(!directionCamera);
    };
    React.useEffect(() => {
        const takePicture = () => {
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
                // axios({
                //     method: 'POST',
                //     url: 'https://apiomovil.andesscd.com.co/api/v1/enrolment/abcdefg',
                //     data: formData,
                //     headers: {
                //         x_access_token:
                //             'uTKGjgGvK2CAKwkioaLr43h45hdfhdfhDG53Edgsdg',
                //     },
                // })
                //     .then((data) => console.log(data))
                //     .catch((err) => console.log(err));
                return new File([u8arr], filename, { type: mime });
            }

            // Declaramos elementos del DOM
            const $video = document.querySelector('#video'),
                $canvas = document.querySelector('#canvas'),
                $boton = document.querySelector('#boton'),
                $estado = document.querySelector('#estado');

            let constraints = {
                video: {
                    facingMode: directionCamera ? 'user' : 'environment',
                    width: { min: 1200, ideal: 1280, max: 1920 },
                    height: { min: 800, ideal: 800, max: 1080 },
                },
            };

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                stream.getVideoTracks()[0].onended = () => console.log('ended');
                var video = document.getElementById('video');
                video.playsInline = true;
                video.srcObject = stream;
                video.play();
                var canvas = document.getElementById('canvas');
                var c2d = canvas.getContext('2d');
                function draw() {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    c2d.drawImage(
                        video,
                        0,
                        0,
                        video.videoWidth,
                        video.videoHeight
                    );
                    requestAnimationFrame(draw);
                }
                requestAnimationFrame(draw);
                $boton.addEventListener('click', function () {
                    //Pausar reproducción
                    $video.pause();

                    //Obtener contexto del canvas y dibujar sobre él
                    let contexto = $canvas.getContext('2d');
                    $canvas.width = $video.videoHeight;
                    $canvas.height = $video.videoWidth;

                    contexto.translate($canvas.width / 2, $canvas.height / 2);
                    contexto.rotate((Math.PI * 3) / 2);
                    contexto.drawImage(
                        $video,
                        $video.videoWidth / -2,
                        $video.videoHeight / -2
                    );
                    let foto = $canvas.toDataURL(); //Esta es la foto, en base 64
                    let imgBase64 = document.getElementById('imgBase64');
                    imgBase64.src = foto;
                    dataURLtoFile(imgBase64.src, 'img.png');
                    if (props.takePhoto === 'delantera') {
                        props.setImage(imgBase64.src);
                        props.setUploadImage(true);
                    } else {
                        props.setImagenTrasera(imgBase64.src);
                        props.setUploadImageTwo(true);
                    }
                    // {
                    //     props.setImage(foto);
                    // }
                    //Reanudar reproducción
                    $video.play();
                    props.setUseCamera(false);
                });
            });
        };
        if (useCamera) {
            takePicture();
        }
    }, [directionCamera]);
    const closeModal = () => {
        props.setUseCamera(false);
    };

    return ReactDOM.createPortal(
        <section className="camera_open">
            <div className="back">
                <figure>
                    <img src={back} alt="" onClick={closeModal} />
                </figure>
            </div>
            <article className="camera_open-relative">
                <video
                    muted="muted"
                    id="video"
                    className="video"
                    width="1200px"
                    height="800px"
                ></video>
                <div className="camera_open-absolute">
                    <div>
                        <h3>
                            {props.direction} de tu {props.identification}
                        </h3>
                        <figure>
                            {/* <img src={credencial} alt="" /> */}
                        </figure>
                        <p>
                            Ubica el {props.direction} de tu{' '}
                            {props.identification} dentro del recuadro
                        </p>
                    </div>
                    <div className="buttons_container">
                        <button id="boton" className="button_take"></button>
                        <div className="camera_open-absolute-containerS">
                            <div
                                name="listaDeDispositivos"
                                id="listaDeDispositivos"
                                className="listaDeDispositivos"
                                onClick={changeCamera}
                            ></div>
                            <figure className="camera_open-relative-icon">
                                <img src={reverse} alt="" />
                            </figure>
                        </div>
                    </div>
                </div>
            </article>
            <button onClick={changeDirection}></button>

            <img src="" alt="" id="imgBase64" />
            <canvas id="canvas" style={{ display: 'none' }}></canvas>
        </section>,
        document.getElementById('modal')
    );
}

export { Camera };
