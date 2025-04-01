
export type menuItem = {
    _id:string;
    name:string;
    price:number;
    imageMenu:any;
    category:string;
    status:string;
    createdAt: string;
    updatedAt: string;
}


export type restaurant = {
    _id:string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItem: menuItem[];
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}


export type searchRespone = {
    data: restaurant[];
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}

export type SearchState = {
    searchQuery: string;
    page:number;
    cuisines: string[];
    sortOption:string;
}

export type CartItem = {
    _id:string;
    name:string;
    price:number;
    quantity:number;
}


export type CheckoutSessionRequest = {
    cartItems: {
      _id: string;
      name: string;
      quantity: number;
    }[];
    deliveryDetail: {
      name: string;
      addressLine1: string;
      city: string;
      email?: string | undefined;
    };
    restaurantId: string;
};

export type Order = {
    _id:string;
    restaurant: restaurant;
    user:{
        _id:string;
        email:string;
        name:string;
        addressLine1:string;
        city:string;
        country:string;
    }
    cartItem: {
        _id: string;
        name:  string;
        quantity: number;
    }[];
    totalAmout: number;
    status: 'placed'| 'paid' | 'inProcess' | 'outForDelivery' | 'delivered';
    createAt:string;
}


export type ProcessBar = () => {
    
}

export type MenuRequest = {
    item:string;
    quantity:number;
}

export type Cart = MenuRequest[]

export type PaymentRequest = {
    orderList: MenuRequest[];
    bankCode:string;
}

export type order = {
    _id:string;
    menu:[
        {
            item:{
                _id:string;
                name:string;
                imageMenu:string;
                price:number;
                restaurant:{
                    _id:string;
                    restaurantName:string;
                },
                category:string;
            },
            quantity:number;
        }
    ];
    status:string;
    total: number;
    bankCode: string;
    email:string;
    createdAt:string;
    updatedAt:string;
}

export type restaurantClient = {
    _id:string;
    restaurantName:string;
    cuisines: string[];
    city:string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    imageUrl: string;
    menuItem: menuItem[];
    createdAt: Date;
    updatedAt: Date;
}

export type ordersList = order[]

export type paginationObj = {
    page:number;
    limit:number;
    total:number;
}

export type searchObj = {
    searchText: string;
    sort:string[];
    genre: string [];
    status:string;
}

interface Notification {
    title: string;
    body: string;
}
  
interface Data {
type: string;
orderId: string;
amount: string;
}
  
export interface MessageNotification {
notification: Notification;
data: Data;
}