import Vue from 'vue';

import Listagem from './views/Listagem.vue';
import Formulario from './views/Formulario.vue';
import { IonicVueRouter } from '@ionic/vue';

Vue.use(IonicVueRouter);

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Listagem,
    },
    { path: '/tarefas/form/:id?', component: Formulario, name: 'form', props: true },

  ],
});
