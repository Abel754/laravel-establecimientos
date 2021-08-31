<template>
    <div class="mapa">
        <l-map
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
        >
            <l-tile-layer :url="url" :attribution="attribution" />

            <l-marker
                v-for="establecimiento in establecimientos"
                v-bind:key="establecimiento.id"
                :lat-lng="obtenerCoordenadas(establecimiento)"
                :icon="iconoEstablecimiento(establecimiento)"
                @click="redireccionar(establecimiento.id)"
            >
                <l-tooltip>
                    <div>
                        {{establecimiento.nombre}} - {{establecimiento.categoria.nombre}}
                    </div>
                </l-tooltip>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
import {latLng} from 'leaflet';
import {LMap, LTileLayer, LMarker, LTooltip, LIcon} from 'vue2-leaflet';

export default {
   components: {
       LMap,
       LTileLayer,
       LMarker,
       LTooltip,
       LIcon
   },
  data() {
    return {
      zoom: 13,
      center: latLng(41.119932, 1.234113),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 11.5,
      currentCenter: latLng(41.119932, 1.234113),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  created() {
      axios.get('/api/establecimiento')
        .then(respuesta => {
            this.$store.commit('AGREGAR_ESTABLECIMIENTOS', respuesta.data) // Afegeix els pins
        })
  },
  computed: {
      establecimientos() {
          return this.$store.getters.obtenerEstablecimientos // IObté els noms dels establecimientos
      }
  },
  methods: {
      obtenerCoordenadas(establecimiento) {
          return {
              lat: establecimiento.lat,
              lng: establecimiento.lng
          }
      },
      iconoEstablecimiento(establecimiento) {
          // Utilitzem la instrucció L.icon per modificar els iconos dels pins
          // Creem una variable anomenada slug per obtenir el nom de la categoria que estem iterant en el for de dalt
          // Amb aquest nom, ja que les imatges dels pins es diuen igual que les categories, buscarem les imatges dins de la carpeta
          const {slug} = establecimiento.categoria;
          return L.icon({
              iconUrl: `images/iconos/${slug}.png`,
              iconSize: [40,50]
          })
      },
      redireccionar(id) { // Va a la ruta establecimiento del router/index.js amb aquells paràmetres
          this.$router.push({name: 'establecimiento', params: {id}})
      }
  },
  watch: { // El watch són funcions que es mantenen a l'espera d'ubn canvi en una funció per executar-se
      "$store.state.categoria": function() {
          axios.get('/api/' + this.$store.getters.obtenerCategoria) // Obté la categoria
            .then(respuesta => {
                this.$store.commit('AGREGAR_ESTABLECIMIENTOS', respuesta.data) // Afegeix els PINS segons la categoria
            })
      }
  }
}
</script>

<style scoped>
    .mapa {
        height: 600px;
        width: 100%;
    }
</style>
