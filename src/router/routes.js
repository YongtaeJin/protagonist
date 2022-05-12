import Home from '../views/HomeView.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	},
	{
		path: '/login',
		name: 'NoAuthLogin',
		component: () => import(/* webpackChunkName: "login" */ '../views/member/LoginView.vue')
	},
	{
		path: '/join',
		name: 'NoAuthJoin',
		component: () => import(/* webpackChunkName: "join" */ '../views/member/JoinView.vue')
	},
	{
		path: '/modifyPassword/:hash',		        
		name: 'NoAuthModifyPassword',
		component: () => import(/* webpackChunkName: "modifyPassword" */ '../views/member/ModifyPasswordView.vue')
	},
	{
		path: '*',
		name: 'Error',
		component: () => import(/* webpackChunkName: "error" */ '../views/ErrorView.vue')
	},
]

export default routes;