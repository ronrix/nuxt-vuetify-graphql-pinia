export interface ProductOptions {
	description?: string
	fixAmount?: number
	discount?: number
	[index: string]: any
}

export interface Order {
	id: string
	name: string
	type: string
	image: string
	qty: number
	price: number
	customization: ProductOptions
}

export type Transact = {
	customerName: string
	orders: Order[]
	totalPrice: number
	cashAmount?: number
	status?: string
	table?: string
}

export type DefaultTransaction = {
	default?: Transact[]
}

export type Transactions = {
	[index: string]: Transact
} & DefaultTransaction
