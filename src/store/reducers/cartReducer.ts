import {ICart} from "../../model/cartTypes";

export enum CartActionTypes {
  FETCH_CARTS = 'FETCH_CARTS',
  FETCH_CARTS_SUCCESS = 'FETCH_CARTS_SUCCESS',
  FETCH_CARTS_ERROR = 'FETCH_CARTS_ERROR',
  ADD_CARTS = 'ADD_CARTS',
  ADD_CARTS_SUCCESS = 'ADD_CARTS_SUCCESS',
  ADD_CARTS_ERROR = 'ADD_CARTS_ERROR',
  DELETE_CARTS = 'DELETE_CARTS',
  DELETE_CARTS_SUCCESS = 'DELETE_CARTS_SUCCESS',
  DELETE_CARTS_ERROR = 'DELETE_CARTS_ERROR',
  UPDATE_CARTS = 'UPDATE_CARTS',
  UPDATE_CARTS_SUCCESS = 'UPDATE_CARTS_SUCCESS',
  UPDATE_CARTS_ERROR = 'UPDATE_CARTS_ERROR',
  FETCH_CART = 'FETCH_CART',
  FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS',
  FETCH_CART_ERROR = 'FETCH_CART_ERROR',
  CLEAR_CARTS = 'CLEAR_CARTS',
}

interface IFetchCarts{
  type:CartActionTypes.FETCH_CARTS
}

interface IFetchCartsSuccess{
  type:CartActionTypes.FETCH_CARTS_SUCCESS,
  payload:ICart[]
}

interface IFetchCartsError{
  type:CartActionTypes.FETCH_CARTS_ERROR,
  payload:string
}

interface IAddCart{
  type:CartActionTypes.ADD_CARTS
}


interface IAddCartSuccess{
  type:CartActionTypes.ADD_CARTS_SUCCESS,
  payload:ICart
}

interface IAddCartError{
  type:CartActionTypes.ADD_CARTS_ERROR,
  payload:string
}

interface IDeleteCart{
  type:CartActionTypes.DELETE_CARTS
}

interface IDeleteCartSuccess{
  type:CartActionTypes.DELETE_CARTS_SUCCESS,
  payload:number
}

interface IDeleteCartError{
  type:CartActionTypes.DELETE_CARTS_ERROR,
  payload:string
}

interface IUpdateCart{
  type:CartActionTypes.UPDATE_CARTS
}

interface IUpdateCartSuccess{
  type:CartActionTypes.UPDATE_CARTS_SUCCESS,
  payload:ICart
}

interface IUpdateCartError{
  type:CartActionTypes.UPDATE_CARTS_ERROR,
  payload:string
}

interface IFetchCart{
  type:CartActionTypes.FETCH_CART
}

interface IFetchCartSuccess{
  type:CartActionTypes.FETCH_CART_SUCCESS,
  payload:ICart
}

interface IFetchCartError{
  type:CartActionTypes.FETCH_CART_ERROR,
  payload:string
}

interface IClearCarts{
  type:CartActionTypes.CLEAR_CARTS

}

type CartAction = IFetchCarts | IFetchCartsSuccess | IFetchCartsError | IAddCart | IAddCartSuccess | IAddCartError | IDeleteCart | IDeleteCartSuccess | IDeleteCartError | IUpdateCart | IUpdateCartSuccess | IUpdateCartError | IFetchCart | IFetchCartSuccess | IFetchCartError | IClearCarts

interface ICartState{
  carts:ICart[],
  loading:boolean,
  error:string,
  cart:ICart|null
}

const initialState:ICartState = {
  carts:[],
  loading:false,
  error:'',
  cart:null
}


export const cartReducer = (state = initialState, action:CartAction):ICartState => {
  switch (action.type) {
    case CartActionTypes.FETCH_CARTS:
      return {...state, loading:true}
    case CartActionTypes.FETCH_CARTS_SUCCESS:
      return {...state, loading:false, carts:action.payload}
    case CartActionTypes.FETCH_CARTS_ERROR:
      return {...state, loading:false, error:action.payload}
    case CartActionTypes.ADD_CARTS:
      return {...state, loading:true}
    case CartActionTypes.ADD_CARTS_SUCCESS:
      return {...state, loading:false, carts:[...state.carts, action.payload]}
    case CartActionTypes.ADD_CARTS_ERROR:
      return {...state, loading:false, error:action.payload}
    case CartActionTypes.DELETE_CARTS:
      return {...state, loading:true}
    case CartActionTypes.DELETE_CARTS_SUCCESS:
      return {...state, loading:false, carts:state.carts.filter(cart => cart.id !== action.payload)}
    case CartActionTypes.DELETE_CARTS_ERROR:
      return {...state, loading:false, error:action.payload}
    case CartActionTypes.UPDATE_CARTS:
      return {...state, loading:true}
    case CartActionTypes.UPDATE_CARTS_SUCCESS:
      return {...state, loading:false, carts:state.carts.map(cart => cart.id === action.payload.id ? action.payload : cart)}
    case CartActionTypes.UPDATE_CARTS_ERROR:
      return {...state, loading:false, error:action.payload}
    case CartActionTypes.FETCH_CART:
      return {...state, loading:true}
    case CartActionTypes.FETCH_CART_SUCCESS:
      return {...state, loading:false, cart:action.payload}
    case CartActionTypes.FETCH_CART_ERROR:
      return {...state, loading:false, error:action.payload}
    case CartActionTypes.CLEAR_CARTS:
      return {...state, carts:[]}
    default:
      return state
  }
}


