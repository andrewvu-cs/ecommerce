export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (existingCartItem){
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ?{ ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
            )
    }
    // quantity prop gets attached the first time around since the if block won't run when it's a new item;
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}