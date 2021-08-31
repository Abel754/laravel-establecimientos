<template>
    <div>
        <vue-page-transition name="fade-in-right">
            <router-view></router-view> <!-- Serà el contingut que tinguem en router. En aquest cas el fitxer router/index.js  en la const routes -->
        </vue-page-transition>
    </div>
</template>

<script>
// Utilitzar un altre fitxer Vue des d'aquí
import CategoriaCafe from './CategoriaCafe';
import CategoriaRestaurant from './CategoriaRestaurant';
import CategoriaHotel from './CategoriaHotel';

import store from '../store';

export default {
    store,
}
</script>
