export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  appointments?: [];
  id?: string;
  role?: string;
  status?: string;
}
export interface ILogedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  image: string;
}

export interface IErrors {
  [key: string]: string;
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
  address?: string;
}
export interface IParking {
  status: string;
  id: string;
  lat: string;
  lng: string;
  location: string;
  name: string;
  slot: ISlot[];
  slots_stock: number;
}
export interface ISlot {
  id: string;
  slot_status: string;
  slot_number: number;
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
