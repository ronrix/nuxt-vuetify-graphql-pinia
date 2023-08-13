export interface ProductOptions {
	description: string
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
