import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // State seria el 'data' d'un fitxer Vue
        cafes: [],
        restaurantes: [],
        hoteles: [],
        establecimiento: {},
        establecimientos: [],
        categorias: [],
        categoria: ''
    },
    mutations: { // Mutations és el mounted d'un fitxer Vue
        AGREGAR_CAFES(state, cafes) {
            state.cafes = cafes;
        },
        AGREGAR_RESTAURANTES(state, restaurantes) {
            state.restaurantes = restaurantes;
        },
        AGREGAR_HOTELES(state, hoteles) {
            state.hoteles = hoteles;
        },
        AGREGAR_ESTABLECIMIENTO(state, establecimiento) {
            state.establecimiento = establecimiento;
        },
        OBTENER_IMAGENES(state, imagenes) {
            state.establecimiento.imagenes = imagenes;
        },
        AGREGAR_ESTABLECIMIENTOS(state, establecimientos) {
            state.establecimientos = establecimientos;
        },
        AGREGAR_CATEGORIAS(state, categorias) {
            state.categorias = categorias;
        },
        SELECCIONAR_CATEGORIA(state, categorias) {
            state.categoria = categorias;
        },
    },
    // També es pot fer el 'AGREGAR_ESTABLECIMIENTO' amb getters
    getters: {
        obtenerEstablecimiento: state => {
            return state.establecimiento;
        },
        obtenerEstablecimientos: state => {
            return state.establecimientos;
        },
        obtenerCategorias: state => {
            return state.categorias;
        },
        obtenerCategoria: state => {
            return state.categoria;
        }
    }
});
