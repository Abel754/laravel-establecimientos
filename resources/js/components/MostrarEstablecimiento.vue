<template>
    <div class="container my-5">
        <h2 class="text-center mb-5">{{establecimiento.nombre}}</h2> <!-- Crida la funció -->

        <div class="row align-items-start">
            <!-- Order: classe de bootstrap que fa que es mostri en segona posició i l'aside d'abaix en primera -->
            <div class="col-md-8 order-2">
                <!-- Accedim a la imatge posant establecimiento.imagen -->
                <img :src="`../storage/${establecimiento.imagen}`" alt="imagen establecimiento">
                <p class="mt-3">{{establecimiento.descripcion}}</p>
                <galeria-imagenes></galeria-imagenes>
            </div>

            <aside class="col-md-4 order-1">
                <div>
                    <mapa-ubicacion></mapa-ubicacion>
                </div>

                <div class="p-4 bg-primary">
                    <h2 class="text-center text-white mt-2 mb-4">Más Información</h2>

                    <p class="text-white mt-1">
                        <span class="font-weight-bold">
                            Ubicación:
                        </span>
                        {{establecimiento.direccion}}
                    </p>

                    <p class="text-white mt-1">
                        <span class="font-weight-bold">
                            Colonia:
                        </span>
                        {{establecimiento.colonia}}
                    </p>

                    <p class="text-white mt-1">
                        <span class="font-weight-bold">
                            Horario:
                        </span>
                        {{establecimiento.apertura}} - {{establecimiento.cierre}}
                    </p>

                    <p class="text-white mt-1">
                        <span class="font-weight-bold">
                            Teléfono:
                        </span>
                        {{establecimiento.telefono}}
                    </p>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
import MapaUbicacion from './MapaUbicacion.vue';
import GaleriaImagenes from './GaleriaImagenes.vue';

export default {

    components: {
        MapaUbicacion,
        GaleriaImagenes
    },

    mounted() {
        const {id} = this.$route.params; // Accedim als params que passem al clicar la URL mitjançant aquesta instrucció

        axios.get('/api/establecimientos/' + id)
            .then(respuesta => {
                this.$store.commit('AGREGAR_ESTABLECIMIENTO', respuesta.data)
            })
    },
    computed: {
        establecimiento() {
            return this.$store.state.establecimiento; // Accedeix al store/index.js i agafa establecimiento
            // Si féssim amb getters:
                //return this.$store.getters.obtenerEstablecimiento;
        }
    }
}
</script>
