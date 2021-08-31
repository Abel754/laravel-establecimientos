<template>
    <div class="container my-5">
        <h2>Restaurants</h2>

        <div class="row">
            <!-- Accedirem al bucle de this.cafes que és la informació que treiem d'apu/categorias/cafe i podrem accedir als valors de les columnes -->
            <div class="col-md-4 mt-4" v-for="restaurant in this.restaurantes" v-bind:key="restaurant.id">
                <div class="card">
                    <div class="card-body">
                        <!-- :src perquè sigui dinàmic -->
                        <img class="card-img-top" :src="`storage/${restaurant.imagen}`" alt="card del restaurant">
                        <h3 class="card-title text-primary font-weight-bold">{{restaurant.nombre}}</h3>
                        <p class="card-text">{{restaurant.direccion}}</p>
                        <p class="card-text">
                            <span class="font-weight-bold">Horario:</span>
                            {{restaurant.apertura}} - {{restaurant.cierre}}

                        </p>

                        <!-- Agafa del fitxer router/index.js el name de la ruta i com a params, el id del path -->
                        <router-link :to="{name: 'establecimiento', params: {id: restaurant.id}}">
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
        axios.get('/api/categorias/restaurant')
            .then(respuesta => {
                this.$store.commit('AGREGAR_RESTAURANTES', respuesta.data);
            })
    },
    computed: {
        restaurantes() {
            return this.$store.state.restaurantes;
        }
    }
}
</script>
