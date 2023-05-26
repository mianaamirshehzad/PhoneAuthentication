export const ADD_TO_CART = "add_to_cart";

export function addToCart(item ) {
    return{
        //Payload, data, params anything
        //type will describe the Reducer that do Add to Card on this action
        type: ADD_TO_CART,
        data: item, // data means payload
    }
}