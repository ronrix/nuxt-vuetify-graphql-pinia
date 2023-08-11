export interface ProductCustomization {
	color: string
	description: string
	size: string
	fixAmount: number | null
	discount: number | null
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
