import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import TaskView from '../views/TaskView.vue';
import ProcessView from '../views/ProcessView.vue';
import CreateProcessView from  '../views/CreateProcessView.vue';
import WorkflowView from  '../views/WorkflowView.vue';

import keycloak from '@/lib/keycloak'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } // Añadir meta para proteger la ruta
  },
  {
    path: '/task',
    name: 'TaskView',
    component: TaskView,
    meta: { requiresAuth: true } // Añadir meta para proteger la ruta
  },
  {
    path: '/process',
    name: 'ProcessView',
    component: ProcessView,
    meta: { requiresAuth: true } // Añadir meta para proteger la ruta
  },
  {
    path: '/process/start/:id',
    name: 'ProcessStart',
    component: CreateProcessView,
    meta: { requiresAuth: true } // Añadir meta para proteger la ruta
  },
  {
    path: '/workflow',
    name: 'Workflow',
    component: WorkflowView,
    meta: { requiresAuth: true } // Añadir meta para proteger la ruta
  },
  {
    path: '/workflow/edit/:id',
    name: 'workflowedit',
    component: WorkflowView,
    meta: { requiresAuth: true } // Añadir meta para proteger la ruta
  }
  
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});


export default router;
