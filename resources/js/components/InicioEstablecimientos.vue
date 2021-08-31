<template>
    <div>
        <!-- Si hi ha lletra en majúscula, reemplaçem per guió -->
        <listado-categorias></listado-categorias>
        <mapa-establecimientos></mapa-establecimientos>
        <categoria-cafe></categoria-cafe>
        <categoria-restaurant></categoria-restaurant>
        <categoria-hotel></categoria-hotel>
    </div>
</template>

<script>
// Utilitzar un altre fitxer Vue des d'aquí
import ListadoCategorias from './ListadoCategorias';
import MapaEstablecimientos from './MapaEstablecimientos';
import CategoriaCafe from './CategoriaCafe';
import CategoriaRestaurant from './CategoriaRestaurant';
import CategoriaHotel from './CategoriaHotel';

export default {
    components: { // Utilitzem fitxer vue
        ListadoCategorias,
        MapaEstablecimientos,
        CategoriaCafe,
        CategoriaRestaurant,
        CategoriaHotel,
    }
}
</script>

