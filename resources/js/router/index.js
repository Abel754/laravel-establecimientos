import Vue from 'vue';
import VueRouter from 'vue-router';
import VuePageTransition from 'vue-page-transition';
import InicioEstablecimientos from '../components/InicioEstablecimientos';
import MostrarEstablecimiento from '../components/MostrarEstablecimiento';

const routes = [
    {
        path: '/',
        component: InicioEstablecimientos
    },
    {
        path: '/establecimiento/:id', // Serà per passar-li una ID de laravel
        name: 'establecimiento',
        component: MostrarEstablecimiento
    },
]

const router = new VueRouter({
    mode: 'history', // Quan entri a un href, treurà el '#' del link
    routes
});

Vue.use(VueRouter);
Vue.use(VuePageTransition);

export default router;
