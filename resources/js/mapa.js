// Servirà per utilitzar el buscador de carrers. Un cop fet npm install leaflet-geosearch,
// utiltizarem el següent codi
import {OpenStreetMapProvider} from 'leaflet-geosearch';
const provider = new OpenStreetMapProvider();


// Per afegir el mapa és necessari el següent codi utilitant la llibreria Leaflet
document.addEventListener('DOMContentLoaded', () => {

    if(document.querySelector('#mapa')) { // El nostre div té la ID mapa
        // S'ha de seguir els passos del curs, fas click en un lloc del Google Maps i copies les coordenades
        // Posem així perquè l'usuari no hagi de tornar a omplir si s'equivoca amb el formulari
        const lat = document.querySelector('#lat').value === '' ? 41.119932 : document.querySelector('#lat').value;
        const lng = document.querySelector('#lng').value === '' ? 1.234113 : document.querySelector('#lng').value;
        // 16 -> El zoom del mapa
        const mapa = L.map('mapa').setView([lat, lng], 16);

        // Eliminar pines previos
        let markers = new L.FeatureGroup().addTo(mapa);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

        let marker;

        // agregar el pin
        marker = new L.marker([lat, lng],{
            draggable: true, // Permet que l'usuari pugui moure el PIN
            autoPan: true, // Permet moure el PIN arrossegant pels extrems del mapa
        }).addTo(mapa);

        // Agregar el pin a las capas
        markers.addLayer(marker);

        let apikey = 'AAPKd71f83b0e34d45138970f376749947d6klDhF_yaVcqg4UWnhRGvfp2WOb1nrfkA0OshghJIdmeE35las8wmYkW7fg4lpavR';
        // Geocode Service
        const geocodeService = L.esri.Geocoding.geocodeService({
            apikey: apikey,
        });

        // Buscador de direcciones
        const buscador = document.querySelector('#formbuscador');
        buscador.addEventListener('input', buscarDireccion);

        reubicarPin(marker);

        function reubicarPin(marker) {
            // Detectar movimiento del marker (PIN)
            marker.on('moveend', function(e) {
                marker = e.target;
                const posicion = marker.getLatLng(); // Mètode de Leaflet que obté Latitud i Longitud

                // Centrar automáticamente al posar el PIN a algun lloc
                mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

                // Reverse Geocoding cuando el usuario reubica el pin
                geocodeService.reverse().latlng(posicion, 16).run(function(error,resultado) {
                    console.log(resultado.address);
                    // Mostra a sobre del PIN el carrer on estem al moure'l
                    marker.bindPopup(resultado.address.LongLabel);
                    marker.openPopup();

                    // Llenar los campos del formulario
                    llenarInputs(resultado);
                });

            });
        }

        function buscarDireccion(e) {
            // Si l'usuari escriu 10 lletres mínim
            if(e.target.value.length > 1) { // Autocomplentem amb el que usuari posi + Espanya
                provider.search({query: e.target.value + ' Espanya '})
                    .then(resultado => {
                        if(resultado) {

                            // Limpiar pines previos
                            markers.clearLayers();

                            //console.log(resultado)
                            // En aquesta ocasió és resultado[0] perquè aixì entrem al primer resultat que trobi
                            // Posarem bounds perquè dins de resultado es troba l'array bounds amb el contingut latitud i longitud
                            geocodeService.reverse().latlng(resultado[0].bounds[0], 16).run(function(error,resultado) {

                                // Llenar los inputs
                                llenarInputs(resultado);

                                //Centrar el mapa
                                console.log(resultado)
                                mapa.setView(resultado.latlng);

                                // Agregar el PIN
                                marker = new L.marker(resultado,{
                                    draggable: true, // Permet que l'usuari pugui moure el PIN
                                    autoPan: true, // Permet moure el PIN arrossegant pels extrems del mapa
                                }).addTo(mapa);

                                // asignar al contenedor de markers el nuevo pin
                                markers.addLayer(marker);

                                // Mover el PIN
                                reubicarPin(marker);

                            });
                        }
                    })
            }
        }

        function llenarInputs(resultado) {
            console.log(resultado)
            // Tots són inputs de tipus hidden
            document.querySelector('#dire').value = resultado.address.Address || '';
            document.querySelector('#colo').value = resultado.address.Neighborhood || '';
            document.querySelector('#lat').value = resultado.latlng.lat || '';
            document.querySelector('#lng').value = resultado.latlng.lng || '';

            document.querySelector('#direccion').value = resultado.address.Address || '';
            document.querySelector('#colonia').value = resultado.address.Neighborhood || '';
        }

    }

});
