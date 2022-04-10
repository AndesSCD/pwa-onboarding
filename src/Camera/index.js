import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './camera.css';

function Camera(props) {
    let useCamera = props.useCamera;
    let [here, setHere] = React.useState(0);
    function changeDirection(limit) {
        setHere(++here);
        console.log(here);
    }
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
                //     url: 'http://3.85.27.146:5000/api/v1/enrolment/abcdefg',
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
            let contador = 0;
            function tieneSoporteUserMedia() {
                return !!(
                    navigator.getUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.mediaDevices.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.msGetUserMedia
                );
            }
            function _getUserMedia() {
                return (
                    navigator.getUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.mediaDevices.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.msGetUserMedia
                ).apply(navigator, arguments);
            }

            // Declaramos elementos del DOM
            const $video = document.querySelector('#video'),
                $canvas = document.querySelector('#canvas'),
                $boton = document.querySelector('#boton'),
                $estado = document.querySelector('#estado'),
                $listaDeDispositivos = document.querySelector(
                    '#listaDeDispositivos'
                );

            // La función que es llamada después de que ya se dieron los permisos
            // Lo que hace es llenar el select con los dispositivos obtenidos
            const llenarSelectConDispositivosDisponibles = () => {
                navigator.mediaDevices
                    .enumerateDevices()
                    .then(function (dispositivos) {
                        const dispositivosDeVideo = [];
                        dispositivos.forEach(function (dispositivo) {
                            const tipo = dispositivo.kind;
                            if (tipo === 'videoinput') {
                                dispositivosDeVideo.push(dispositivo);
                            }
                        });

                        // Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
                        if (dispositivosDeVideo.length > 0 && contador === 0) {
                            // Llenar el select
                            dispositivosDeVideo.forEach((dispositivo) => {
                                const option = document.createElement('option');
                                option.value = dispositivo.deviceId;
                                option.text = dispositivo.label;
                                $listaDeDispositivos.appendChild(option);
                            });
                        }
                        contador = 1;
                    });
            };

            // Comenzamos viendo si tiene soporte, si no, nos detenemos
            if (!tieneSoporteUserMedia()) {
                alert('Lo siento. Tu navegador no soporta esta característica');
                $estado.innerHTML =
                    'Parece que tu navegador no soporta esta característica. Intenta actualizarlo.';
                return;
            }
            //Aquí guardaremos el stream globalmente
            let stream;

            // Comenzamos pidiendo los dispositivos
            navigator.mediaDevices
                .enumerateDevices()
                .then(function (dispositivos) {
                    // Vamos a filtrarlos y guardar aquí los de vídeo
                    const dispositivosDeVideo = [];

                    // Recorrer y filtrar
                    dispositivos.forEach(function (dispositivo) {
                        const tipo = dispositivo.kind;
                        if (tipo === 'videoinput') {
                            dispositivosDeVideo.push(dispositivo);
                        }
                    });
                    let total = dispositivosDeVideo.length;
                    console.log(dispositivosDeVideo, dispositivos);

                    // Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
                    // y le pasamos el id de dispositivo
                    if (dispositivosDeVideo.length > 0) {
                        // Mostrar stream con el ID del primer dispositivo, luego el usuario puede cambiar
                        mostrarStream(dispositivosDeVideo[0].deviceId);
                    }
                });

            const mostrarStream = (idDeDispositivo) => {
                _getUserMedia(
                    {
                        video: {
                            // Justo aquí indicamos cuál dispositivo usar
                            deviceId: idDeDispositivo,
                        },
                    },
                    function (streamObtenido) {
                        // Aquí ya tenemos permisos, ahora sí llenamos el select,
                        // pues si no, no nos daría el nombre de los dispositivos
                        llenarSelectConDispositivosDisponibles();
                        console.log($listaDeDispositivos);
                        // Escuchar cuando seleccionen otra opción y entonces llamar a esta función
                        $listaDeDispositivos.onchange = () => {
                            // Detener el stream
                            if (stream) {
                                stream.getTracks().forEach(function (track) {
                                    track.stop();
                                });
                            }
                            // Mostrar el nuevo stream con el dispositivo seleccionado
                            mostrarStream($listaDeDispositivos.value);
                        };

                        // Simple asignación
                        stream = streamObtenido;

                        // Mandamos el stream de la cámara al elemento de vídeo
                        $video.srcObject = stream;
                        $video.play();

                        //Escuchar el click del botón para tomar la foto
                        $boton.addEventListener('click', function () {
                            //Pausar reproducción
                            $video.pause();

                            //Obtener contexto del canvas y dibujar sobre él
                            let contexto = $canvas.getContext('2d');
                            $canvas.width = $video.videoWidth;
                            $canvas.height = $video.videoHeight;
                            contexto.drawImage(
                                $video,
                                0,
                                0,
                                $canvas.width,
                                $canvas.height
                            );
                            let foto = $canvas.toDataURL(); //Esta es la foto, en base 64
                            let imgBase64 =
                                document.getElementById('imgBase64');
                            props.setImage(
                                document.getElementById('imgBase64').src
                            );
                            imgBase64.src = foto;
                            dataURLtoFile(imgBase64.src, 'img.png');
                            // {
                            //     props.setImage(foto);
                            // }
                            //Reanudar reproducción
                            $video.play();
                        });
                    },
                    function (error) {
                        console.log('Permiso denegado o error: ', error);
                    }
                );
            };
        };
        if (useCamera) {
            takePicture();
        }
    });

    return ReactDOM.createPortal(
        <section className="camera_open">
            <article></article>
            <article>
                <video muted="muted" id="video"></video>
            </article>
            <button onClick={changeDirection}>asdasdasdasd</button>
            <select
                name="listaDeDispositivos"
                id="listaDeDispositivos"
            ></select>
            <button id="boton" className="button_take">
                Click
            </button>
            <img src="" alt="" id="imgBase64" />
            <canvas id="canvas" style={{ display: 'none' }}></canvas>
        </section>,
        document.getElementById('modal')
    );
}

export { Camera };
