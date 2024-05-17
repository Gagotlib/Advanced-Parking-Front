export interface IUser {
	name: string
	email: string
	password: string
	confirmPassword: string
	phone: number
	appointments?: []
	id?: string
	role?: string
}
export interface ILogedUser {
	id: string
	name: string
	email: string
	phone: string
	role: string
	status: string
	image: string
}

export interface IErrors {
	[key: string]: string
	name?: string
	password?: string
	email?: string
	phone?: string
	address?: string
}
export interface IParking {
	id: string
	name: string
	slots_stock: number
	location: string
}
// export interface IUserLogin {
// 	id: number
// 	role: 'user' | 'admin'
// 	name: string
// 	email: string
// 	phone: string
// 	address: string
// 	credential: {}
// 	orders: IOrder[]
// }
