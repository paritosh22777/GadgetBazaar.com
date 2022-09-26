import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const doesItemExist = state.cartItems.find(
        (id) => id.product === item.product
      );
      if (doesItemExist) {
        // replaces item
        return {
          ...state,
          cartItems: state.cartItems.map((id) =>
            id.product === doesItemExist.product ? item : id
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item], //adds item to cart if not present
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        // eg to remove iPhone all items excluding iPhone will go to cartItems - filter()
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
