import { createRouter, createWebHistory } from 'vue-router';
import SignUpView from '@/views/SignUpView.vue';
import SignUpEndView from '@/views/SignUpEndView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'SignUp',
      component: SignUpView,
    },
    {
      path: '/sign-up-end',
      name: 'SignUpEnd',
      component: SignUpEndView,
    },
  ],
});

export default router;
