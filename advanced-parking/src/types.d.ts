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

