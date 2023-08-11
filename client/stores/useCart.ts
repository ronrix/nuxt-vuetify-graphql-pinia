import swal from 'sweetalert'
import { Cart, ProductCustomization } from '@/types'

type Transact = {
	name: string
	carts: Cart[]
}

type DefaultTransaction = {
	default: Transact[]
}

type Transactions = {
	[index: string]: Transact
} & DefaultTransaction

export const useCart = defineStore('cart', () => {
	const carts = ref<Cart[]>([])
	const transactions = ref<Transactions>({ default: [] })
	const subTotal = ref<number>(0)

	const discount = ref<number>(0.2)
	const discountPercentage = computed<number>(() => discount.value * 100)
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

	/*
		compute product price with the inputed qty from onChange event
	*/
	function computeProductPriceWithQty(index: number) {
		const theCart = carts.value[index]
		const cartTotalPrice = theCart.qty * theCart.price
		return cartTotalPrice
	}

	function inputQty(value: number, id: string) {
		const cartExist = carts.value.findIndex((cart) => cart.id === id)
		carts.value[cartExist].qty = value
		const thePrice = computeProductPriceWithQty(cartExist) - carts.value[cartExist].price
		subTotal.value += thePrice
	}

	function removeProduct(id: string) {
		const cartExist = carts.value.findIndex((cart) => cart.id === id)

		const thePrice = computeProductPriceWithQty(cartExist)
		subtractPrice(thePrice)

		carts.value.splice(cartExist, 1)
	}

	function addProductCustomizations(productCustomization: ProductCustomization, productId: string) {
		const cartExist = carts.value.findIndex((cart) => cart.id === productId)
		carts.value[cartExist].customization = productCustomization
		if (productCustomization.fixAmount && productCustomization.discount) {
			const oldPrice = carts.value[cartExist].price
			const newPrice = productCustomization.fixAmount * (productCustomization.discount * 100)
			carts.value[cartExist].price = newPrice

			// deduct temp price and add the new price
			console.log(oldPrice, newPrice)
			subtractPrice(oldPrice)
			addPrice(newPrice)
		} else if (productCustomization.fixAmount) {
			carts.value[cartExist].price = productCustomization.fixAmount
		}
	}

	// direct checkout
	async function directCheckout(amount: number) {
		transactions.value.default?.push({
			name: 'customer#' + transactions.value.default?.length,
			carts: carts.value,
			amount,
		})

		return await swal({
			icon: 'success',
			title: 'Successful Checkout',
		}).then(() => {
			carts.value = []
			subTotal.value = 0
		})
	}

	// process transaction dine in
	async function checkoutCart(customerName: string | null, table: string | null) {
		if (subTotal.value === 0) return

		transactions.value[`${table?.replace(/ /g, '').toLowerCase()}`] = {
			name: customerName || 'customer#' + transactions.value.length,
			carts: carts.value,
		}

		return await swal({
			icon: 'success',
			title: 'Successful Checkout',
		}).then(() => {
			carts.value = []
			subTotal.value = 0
		})
	}

	return {
		carts,
		transactions,
		addCart,
		incrementQty,
		decrementQty,
		removeProduct,
		subTotal,
		discount,
		discountPercentage,
		checkoutCart,
		directCheckout,
		isReadyToProcess,
		totalPrice,
		inputQty,
		addProductCustomizations,
	}
})
