
type menuItem = {
    name:string;
    price:number;
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
    lastUpdate: Date;
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