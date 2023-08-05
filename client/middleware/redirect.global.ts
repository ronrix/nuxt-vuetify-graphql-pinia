export default defineNuxtRouteMiddleware((to) => {
	// redirect to home page if url was not found
	if (!to.matched.length) return navigateTo('/')
})
