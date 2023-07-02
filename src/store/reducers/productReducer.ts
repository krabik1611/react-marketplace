import {IProduct} from "../../model/productTypes";

export enum ProductActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR',
  ADD_PRODUCT = 'ADD_PRODUCT',
  ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS',
  ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_ERROR = 'UPDATE_PRODUCT_ERROR',
  FETCH_PRODUCT = 'FETCH_PRODUCT',
  FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR',
  CLEAR_PRODUCTS = 'CLEAR_PRODUCTS',
}

interface IFetchProducts{
  type:ProductActionTypes.FETCH_PRODUCTS
}

interface IFetchProductsSuccess{
  type:ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload:IProduct[]
}

interface IFetchProductsError{
  type:ProductActionTypes.FETCH_PRODUCTS_ERROR,
  payload:string
}

interface IAddProduct{
  type:ProductActionTypes.ADD_PRODUCT
}


interface IAddProductSuccess{
  type:ProductActionTypes.ADD_PRODUCT_SUCCESS,
  payload:IProduct
}

interface IAddProductError{
  type:ProductActionTypes.ADD_PRODUCT_ERROR,
  payload:string
}

interface IDeleteProduct{
  type:ProductActionTypes.DELETE_PRODUCT
}

interface IDeleteProductSuccess{
  type:ProductActionTypes.DELETE_PRODUCT_SUCCESS,
  payload:number
}

interface IDeleteProductError{
  type:ProductActionTypes.DELETE_PRODUCT_ERROR,
  payload:string
}

interface IUpdateProduct{
  type:ProductActionTypes.UPDATE_PRODUCT
}

interface IUpdateProductSuccess{
  type:ProductActionTypes.UPDATE_PRODUCT_SUCCESS,
  payload:IProduct
}

interface IUpdateProductError{
  type:ProductActionTypes.UPDATE_PRODUCT_ERROR,
  payload:string
}

interface IFetchProduct{
  type:ProductActionTypes.FETCH_PRODUCT
}

interface IFetchProductSuccess{
  type:ProductActionTypes.FETCH_PRODUCT_SUCCESS,
  payload:IProduct
}

interface IFetchProductError{
  type:ProductActionTypes.FETCH_PRODUCT_ERROR,
  payload:string
}

interface IClearProducts{
  type:ProductActionTypes.CLEAR_PRODUCTS

}

type ProductAction = IFetchProducts | IFetchProductsSuccess | IFetchProductsError | IAddProduct | IAddProductSuccess | IAddProductError | IDeleteProduct | IDeleteProductSuccess | IDeleteProductError | IUpdateProduct | IUpdateProductSuccess | IUpdateProductError | IFetchProduct | IFetchProductSuccess | IFetchProductError | IClearProducts

interface IProductState{
  products:IProduct[],
  loading:boolean,
  error:string,
  product:IProduct|null
}

const initialState:IProductState = {
  products:[],
  loading:false,
  error:'',
  product:null
}


export const productReducer = (state = initialState, action:ProductAction):IProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS:
      return {...state, loading:true}
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {...state, loading:false, products:action.payload}
    case ProductActionTypes.FETCH_PRODUCTS_ERROR:
      return {...state, loading:false, error:action.payload}
    case ProductActionTypes.ADD_PRODUCT:
      return {...state, loading:true}
    case ProductActionTypes.ADD_PRODUCT_SUCCESS:
      return {...state, loading:false, products:[...state.products, action.payload]}
    case ProductActionTypes.ADD_PRODUCT_ERROR:
      return {...state, loading:false, error:action.payload}
    case ProductActionTypes.DELETE_PRODUCT:
      return {...state, loading:true}
    case ProductActionTypes.DELETE_PRODUCT_SUCCESS:
      return {...state, loading:false, products:state.products.filter(product => product.id !== action.payload)}
    case ProductActionTypes.DELETE_PRODUCT_ERROR:
      return {...state, loading:false, error:action.payload}
    case ProductActionTypes.UPDATE_PRODUCT:
      return {...state, loading:true}
    case ProductActionTypes.UPDATE_PRODUCT_SUCCESS:
      return {...state, loading:false, products:state.products.map(product => product.id === action.payload.id ? action.payload : product)}
    case ProductActionTypes.UPDATE_PRODUCT_ERROR:
      return {...state, loading:false, error:action.payload}
    case ProductActionTypes.FETCH_PRODUCT:
      return {...state, loading:true}
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
      return {...state, loading:false, product:action.payload}
    case ProductActionTypes.FETCH_PRODUCT_ERROR:
      return {...state, loading:false, error:action.payload}
    case ProductActionTypes.CLEAR_PRODUCTS:
      return {...state, products:[]}
    default:
      return state
  }
}


