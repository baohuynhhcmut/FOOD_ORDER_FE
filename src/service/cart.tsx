


export const getCart = () => {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
}

export const setCart = (data:any) => {
    localStorage.setItem('cart',JSON.stringify(data))
}

export const removeCart  = () => {
    localStorage.setItem('cart',JSON.stringify([]))
}


