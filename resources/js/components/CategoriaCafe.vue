<template>
    <div class="container my-5">
        <h2>Cafés</h2>

        <div class="row">
            <!-- Accedirem al bucle de this.cafes que és la informació que treiem d'apu/categorias/cafe i podrem accedir als valors de les columnes -->
            <div class="col-md-4 mt-4" v-for="cafe in this.cafes" v-bind:key="cafe.id">
                <div class="card">
                    <div class="card-body">
                        <!-- :src perquè sigui dinàmic -->
                        <img class="card-img-top" :src="`storage/${cafe.imagen}`" alt="card del restaurant">
                        <h3 class="card-title text-primary font-weight-bold">{{cafe.nombre}}</h3>
                        <p class="card-text">{{cafe.direccion}}</p>
                        <p class="card-text">
                            <span class="font-weight-bold">Horario:</span>
                            {{cafe.apertura}} - {{cafe.cierre}}

                        </p>
                        <!-- Agafa del fitxer router/index.js el name de la ruta i com a params, el id del path -->
                        <router-link :to="{name: 'establecimiento', params: {id: cafe.id}}">
                            <a class="btn btn-primary d-block">Ver Lugar</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    mounted() {
        axios.get('/api/categorias/cafe') // Posem cafe perquè ja no busquem per la ID, busquem pel slug
            .then(respuesta => { // Posem store perquè VueX treballa d'aquesta forma
                this.$store.commit("AGREGAR_CAFES", respuesta.data); // Es fa un commit per executar la funció AGREGAR_CAFES d'store/index.js passant-li com a paràmetres respuesta.data
            })
    },
    computed: { // Un cop muntat, creem funció cafes que serà la que té el nom de la línea 7 i retornem un altre cop, mitjançant store de VueX, l'array cafes que està dins de l'state del fitxer store/index.js
        cafes() {
            return this.$store.state.cafes;
        }
    }
}
</script>
