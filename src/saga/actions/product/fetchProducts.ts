import {IQuery} from "../../../model/queryTypes";
import {ProductActionTypes} from "../../../store/reducers/productReducer";
import {IProduct} from "../../../model/productTypes";
import {call, put,takeLatest} from "redux-saga/effects";
import {api} from "../../../index";


export const fetchProducts = (params?:IQuery) => {
  return {
    type:ProductActionTypes.FETCH_PRODUCTS,
    payload:params
  }
}

const fetchProductsSuccess = (products:IProduct[]) => {
  return {
    type:ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload:products
  }
}

const fetchProductsError = (error:string) => {
  return {
    type:ProductActionTypes.FETCH_PRODUCTS_ERROR,
    payload:error
  }
}

function* fetchProductsAsync(action:any) {
  try {
    const data:IProduct[] = yield call(()=>api.product.getAllProducts(action.payload).then(res=>res.data));
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsError("Error on fetching products"));
  }
}

export function* watchFetchProducts() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS, fetchProductsAsync);
}