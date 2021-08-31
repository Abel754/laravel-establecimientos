<template>
    <div class="mapa">
        <!-- Afegim les opcions que tenim en la funció data. Ha de ser l-map i l-tile-layer. Està fet així perquè són els components importats -->
        <l-map
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
        >

            <l-tile-layer :url="url" :attribution="attribution" />

            <l-marker :lat-lng="{lat, lng}"> <!-- Li passem els valors de data -->
                <l-tooltip> <!-- Utilitza el nom de l'establecimiento i el posa en el PIN -->
                    <div>{{establecimiento.nombre}}</div>
                </l-tooltip>
            </l-marker>

        </l-map>
    </div>
</template>

<script>
import {latLng} from 'leaflet'; // Ho haurem d'importar després del npm --save leaflet
// LMarker -> Pin, LTooltip -> Carrer
import {LMap, LTileLayer, LMarker, LTooltip} from 'vue2-leaflet'; // Ens permetrà utilitzar el mapa amb Vue

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LTooltip
    },
      data() {
        return {
            zoom: 16,
            center: latLng(41.119932, 1.234113),
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            currentZoom: 11.5,
            mapOptions: {
                zoomSnap: 0.5
            },
            showMap: true,
            lat: "",
            lng: ""
        };
    },
    created() {
        setTimeout(() => {
            this.lat = this.$store.state.establecimiento.lat
            this.lng = this.$store.state.establecimiento.lng
            this.center = latLng(this.lat, this.lng);
        }, 1200);
    },
    computed: {
        establecimiento() {
            return this.$store.state.establecimiento; // Accedeix al store/index.js i agafa establecimiento
        }
    }
}
</script>

<style scoped>
    @import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'; /* Afegim el ful d'estils leaflet */

    .mapa {
        height: 300px;
        width: 100%;
    }
</style>

