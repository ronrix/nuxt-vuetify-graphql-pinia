export interface ProductCustomization {
	color: string
	description: string
	size: string
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

export interface IShip {
	id: string
	name: string
	type: string
	image: string
	price: number
	customization: ProductCustomization
}
