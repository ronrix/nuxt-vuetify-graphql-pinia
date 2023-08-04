export default defineNuxtRouteMiddleware((to) => {
	// redirect to pos
	if (to.fullPath === '/') return navigateTo('/pos')
	// redirect to home page if url was not found
	if (!to.matched.length) return navigateTo('/')
})
