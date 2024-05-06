export interface IProduct {
	name: string
	price: number
	description: string
	image: string
	categoryId: number
	stock: number
	id?: number
	category?: string
}

export interface ICategory {
	id?: number
	name: string
	image: string
}

export interface IOrder {
	id: number
	date: Date
	user: IUser
	products: IProduct[]
	status: string
}

export interface IUserLogin {
	id: number
	role: 'user' | 'admin'
	name: string
	email: string
	phone: string
	address: string
	credential: {}
	orders: IOrder[]
}

export interface IUser {
	name: string
	email: string
	password: string
	address: string
	phone: string
}

export interface IErrors {
	[key: string]: string
	name?: string
	password?: string
	email?: string
	phone?: string
	address?: string
}
