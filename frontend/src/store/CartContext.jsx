import { createContext, useReducer } from "react";


const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (item) => {}
});

function cartReducer(state, action){

    if(action.type === 'ADD_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItemsss = [...state.items];

        if(existingCartItemIndex > -1){
            const existingItem = state.items[existingCartItemIndex];
            const updateItem = {
                ...existingItem,
                quantity: existingItem.quantity +1,
            };

            updatedItemsss[existingCartItemIndex] = updateItem;
        } else{
            updatedItemsss.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItemsss};
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItemsss = [...state.items];

        if(existingCartItem.quantity === 1){
            updatedItemsss.splice(existingCartItemIndex, 1);
        }else{
            const updateItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity -1,
            };
            updatedItemsss[existingCartItemIndex] = updateItem;
        }
        return {...state, items: updatedItemsss};
    }

    if(action.type === 'RESET_CART'){
        return state.items = [];
    }

}


export function CartContextProvider({children}){
   const [cart, dispatchCartAction] = useReducer(cartReducer,{items: [] });

   


   function addItem(item){
    dispatchCartAction({
        type: 'ADD_ITEM',
        item
    });
   }


   function removeItem(id){
    dispatchCartAction({
        type: 'REMOVE_ITEM',
        id
    });
   }

   const cartContext ={
    items: cart.items,
    addItem,
    removeItem
   };
// 
    return(
         <CartContext.Provider value={cartContext}>
            {children} 
            </CartContext.Provider>
    );
}

export default CartContext;