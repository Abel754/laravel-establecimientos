const { default: Axios } = require("axios");

document.addEventListener('DOMContentLoaded', () => {

    if(document.querySelector('#dropzone')) {
        Dropzone.autoDiscover = false;


        const dropzone = new Dropzone('div#dropzone', {
            url: '/imagenes/store',
            dictDefaultMessage: 'Sube hasta 10 imágenes',
            maxFiles: 10,
            required: true,
            acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
            addRemoveLinks: true,
            dictRemoveFile: 'Eliminar Imagen',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content
            },
            init: function() {
                // Busca les imatges que hi ha en el edit.blade.php
                const galeria = document.querySelectorAll('.galeria');
                // Si hi ha més d'una imatge
                if(galeria.length > 0) {
                    galeria.forEach(imagen => {
                        const imagenPublicada = {}
                        imagenPublicada.size = 1;
                        imagenPublicada.name = imagen.value;
                        imagenPublicada.nombreServidor = imagen.value;

                        // Agrega a dropzone
                        this.options.addedfile.call(this, imagenPublicada);
                        this.options.thumbnail.call(this, imagenPublicada, `/storage/${imagenPublicada.name}`);
                        // Perquè les imatges apareixin com pujades
                        imagenPublicada.previewElement.classList.add('dz-success');
                        imagenPublicada.previewElement.classList.add('dz-complete');
                    })
                }
            },
            success: function(file, respuesta) {
                //console.log(respuesta)
                file.nombreServidor = respuesta.archivo;
            },
            sending: function(file, xhr, formData) {
                // formData és el que s'envia al servidor, en aquest cas el que s'envia a la funció del controlador
                    //console.log(formData)
                formData.append('uuid', document.querySelector('#uuid').value);
            },
            removedfile: function(file, respuesta) {
                const params = {
                    imagen: file.nombreServidor,
                    uuid: document.querySelector('#uuid').value,
                }
                Axios.post('/imagenes/destroy', params)
                    .then( respuesta => {
                        console.log(file)

                        // Eliminar del DOM
                        file.previewElement.parentNode.removeChild(file.previewElement);
                    })
            }
        });
    }
})
