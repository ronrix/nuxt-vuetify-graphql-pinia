export interface ProductCustomization {
	description: string
	fixAmount?: number
	discount?: number
	[index: string]: any
}

export interface Cart {
	id: string
	name: string
	type: string
	image: string
	qty: number
	price: number
	customization: ProductCustomization
}

export interface Order {
	id: string
	name: string
	type: string
	image: string
	qty: number
	price: number
	customization: ProductCustomization
}

export interface IShip {
	id: string
	name: string
	type: string
	image: string
	price: number
	customization: ProductCustomization
}
