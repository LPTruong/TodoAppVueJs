import { createRouter, createWebHistory } from "vue-router";

import TodoApp from '../components/TodoApp.vue'
import TasksDone from '../components/TasksDone.vue'
import TasksUndone from '../components/TasksUndone.vue'

const routes = [
    {
        path: '/',
        name: 'List of Tasks',
        component: TodoApp,
    },
    {
        path: '/tasksdone',
        name: 'Tasks Finished',
        component: TasksDone,
    },
    {
        path: '/tasksundone',
        name: 'Tasks Unfinished',
        component: TasksUndone,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router