<template>
    <div class="container my-5">
        <h2>Hoteles</h2>

        <div class="row">
            <!-- Accedirem al bucle de this.cafes que és la informació que treiem d'apu/categorias/cafe i podrem accedir als valors de les columnes -->
            <div class="col-md-4 mt-4" v-for="hotel in this.hoteles" v-bind:key="hotel.id">
                <div class="card">
                    <div class="card-body">
                        <!-- :src perquè sigui dinàmic -->
                        <img class="card-img-top" :src="`storage/${hotel.imagen}`" alt="card del restaurant">
                        <h3 class="card-title text-primary font-weight-bold">{{hotel.nombre}}</h3>
                        <p class="card-text">{{hotel.direccion}}</p>
                        <p class="card-text">
                            <span class="font-weight-bold">Horario:</span>
                            {{hotel.apertura}} - {{hotel.cierre}}

                        </p>

                        <!-- Agafa del fitxer router/index.js el name de la ruta i com a params, el id del path -->
                        <router-link :to="{name: 'establecimiento', params: {id: hotel.id}}">
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
        axios.get('/api/categorias/hotel')
            .then(respuesta => {
                this.$store.commit("AGREGAR_HOTELES", respuesta.data);
            })
    },
    computed: {
        hoteles() {
            return this.$store.state.hoteles;
        }
    }
}
</script>
