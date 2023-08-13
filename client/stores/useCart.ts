import swal from 'sweetalert'
import { Order, ProductOptions } from '@/types'

type Transact = {
	customerName: string
	orders: Order[]
	totalPrice: number
	cashAmount?: number
}

type DefaultTransaction = {
	default: Transact[]
}

type Transactions = {
	[index: string]: Transact
} & DefaultTransaction

export const useCart = defineStore('carts', () => {
	const orders = ref<Order[]>([])
	const carts = ref<Transactions>({ default: [] })
	const subTotal = ref<number>(0)

	const discount = ref<number>(0.2)
	const discountPercentage = computed<number>(() => discount.value * 100)
	const isReadyToProcess = computed<boolean>(() => subTotal.value > 0)

	const customerName = ref<string>('')
	const table = ref<string>('')
	const canProcess = computed<boolean>(
		() => !!customerName.value.length && !!table.value.length && !!orders.value.length,
	)

	//  actions
	function removeTable() {
		table.value = ''
	}

	function addOrder(order: Order) {
		// if product already exists in the cart, increment the quantity
		const orderExist = orders.value.findIndex((o) => o.id === order.id)
		if (orderExist >= 0) {
			// increment the qty of the product
			orders.value[orderExist].qty += 1
		} else {
			orders.value.push({ ...order, qty: 1 })
		}
		addPrice(order.price)
	}

	function addPrice(price: number) {
		subTotal.value += price
	}
	function subtractPrice(price: number) {
		subTotal.value -= price
	}

	function incrementQty(id: string) {
		const orderExist = orders.value.findIndex((o) => o.id === id)
		orders.value[orderExist].qty += 1
		addPrice(orders.value[orderExist].price)
	}

	function decrementQty(id: string) {
		const orderExist = orders.value.findIndex((o) => o.id === id)

		// don't decrement if qty = 1
		if (orders.value[orderExist].qty === 1) return

		orders.value[orderExist].qty -= 1
		subtractPrice(orders.value[orderExist].price)

		// delete the product if qty is 0
		if (orders.value[orderExist].qty === 0) {
			orders.value.splice(orderExist, 1)
		}
	}

	/*
		compute product price with the inputed qty from onChange event
	*/
	function computeProductPriceWithQty(index: number) {
		const theOrder = orders.value[index]
		const orderTotalPrice = theOrder.qty * theOrder.price
		return orderTotalPrice
	}

	function inputQty(value: number, id: string) {
		const orderExist = orders.value.findIndex((o) => o.id === id)
		orders.value[orderExist].qty = value
		const thePrice = computeProductPriceWithQty(orderExist) - orders.value[orderExist].price
		subTotal.value += thePrice
	}

	function removeProduct(id: string) {
		const orderExist = orders.value.findIndex((cart) => cart.id === id)

		const thePrice = computeProductPriceWithQty(orderExist)
		subtractPrice(thePrice)

		orders.value.splice(orderExist, 1)
	}

	function addProductCustomizations(productOptions: ProductOptions, productId: string) {
		const orderExist = orders.value.findIndex((o) => o.id === productId)
		orders.value[orderExist].customization = productOptions
		const oldPrice = orders.value[orderExist].price

		if (productOptions.fixAmount && productOptions.discount) {
			const newPrice = parseInt(String(productOptions.fixAmount * (productOptions.discount * 100)))
			orders.value[orderExist].price = newPrice

			// deduct temp price and add the new price
			subtractPrice(oldPrice)
			addPrice(newPrice)
		} else if (productOptions.fixAmount) {
			orders.value[orderExist].price = parseInt(String(productOptions.fixAmount))

			// replace with new price
			subtractPrice(oldPrice)
			addPrice(parseInt(String(productOptions.fixAmount)))
		}

		// add description
		if (productOptions.description) {
			orders.value[orderExist].customization.description = productOptions.description
		}
	}

	// direct checkout
	async function directCheckout(amount: number) {
		if (amount < subTotal.value)
			throw new Error('Invalid amount (input an amount that is greater than the sub total)')
		carts.value.default?.push({
			customerName: 'customer#' + carts.value.default?.length,
			orders: orders.value,
			cashAmount: amount,
			totalPrice: subTotal.value,
		})

		return await swal({
			icon: 'success',
			title: 'Successful Checkout',
		}).then(() => {
			orders.value = []
			subTotal.value = 0
		})
	}

	// process transaction dine in
	async function checkoutCart() {
		if (subTotal.value === 0) return

		carts.value[`${table.value.replace(/ /g, '').toLowerCase()}`] = {
			customerName: customerName.value || 'customer#' + carts.value.length,
			orders: orders.value,
			totalPrice: subTotal.value,
		}

		return await swal({
			icon: 'success',
			title: 'Successful Checkout',
		}).then(() => {
			orders.value = []
			subTotal.value = 0
			customerName.value = ''
			table.value = ''
		})
	}

	return {
		orders,
		carts,
		subTotal,
		discount,
		discountPercentage,
		isReadyToProcess,
		canProcess,
		customerName,
		table,
		removeTable,
		addOrder,
		incrementQty,
		decrementQty,
		removeProduct,
		checkoutCart,
		directCheckout,
		inputQty,
		addProductCustomizations,
	}
})
