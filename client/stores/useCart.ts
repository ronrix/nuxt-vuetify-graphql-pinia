import swal from 'sweetalert'
import { Cart } from '@/types'

export const useCart = defineStore('cart', () => {
	const carts = ref<Cart[]>([])
	const subTotal = ref<number>(0)

	const discount = computed<number>(() => 0.2 * 100)
	const isReadyToProcess = computed<boolean>(() => subTotal.value > 0)
	const totalPrice = computed<number>(() => subTotal.value * discount.value)

	//  actions
	function addCart(data: Cart) {
		// if product already exists in the cart, increment the quantity
		const cartExist = carts.value.findIndex((cart) => cart.id === data.id)
		if (cartExist >= 0) {
			// increment the qty of the product
			carts.value[cartExist].qty += 1
		} else {
			carts.value.push(data)
		}
		addPrice(data.price)
	}

	function addPrice(price: number) {
		subTotal.value += price
	}
	function subtractPrice(price: number) {
		subTotal.value -= price
	}

	function incrementQty(id: string) {
		const cartExist = carts.value.findIndex((cart) => cart.id === id)
		carts.value[cartExist].qty += 1
		addPrice(carts.value[cartExist].price)
	}

	function decrementQty(id: string) {
		const cartExist = carts.value.findIndex((cart) => cart.id === id)
		carts.value[cartExist].qty -= 1
		subtractPrice(carts.value[cartExist].price)

		// delete the product if qty is 0
		if (carts.value[cartExist].qty === 0) {
			carts.value.splice(cartExist, 1)
		}
	}

	function removeProduct(id: string) {
		const cartExist = carts.value.findIndex((cart) => cart.id === id)

		const theCart = carts.value[cartExist]
		const cartTotalPrice = theCart.qty * theCart.price
		subtractPrice(cartTotalPrice)

		carts.value.splice(cartExist, 1)
	}

	// submit checkout
	function checkoutCart() {
		if (subTotal.value === 0) return
		swal({
			icon: 'success',
			title: 'Successful Checkout',
		}).then(() => {
			carts.value = []
			subTotal.value = 0
		})
	}

	return {
		carts,
		addCart,
		incrementQty,
		decrementQty,
		removeProduct,
		subTotal,
		discount,
		checkoutCart,
		isReadyToProcess,
		totalPrice,
	}
})
