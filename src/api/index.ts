import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { IProduct } from "../model/productTypes";
import { ICart } from "../model/cartTypes";
import { IUser } from "../model/userTypes";
import { IQuery } from "../model/queryTypes";

class HttpClient {
  protected instance: AxiosInstance;

  public constructor(BaseURL: string) {
    this.instance = axios.create({
      baseURL: BaseURL,
    });
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = (res: AxiosResponse) => res;
  protected _handleError = (error: AxiosError) => {
    return Promise.reject(error);
  };
}

class Api extends HttpClient {
  constructor() {
    super(`https://fakestoreapi.com`);
    const token = localStorage.getItem("token");
    if (token) {
      this.instance.defaults.headers.common["Authorization"] =
        "Bearer " + token;
    }
  }

  protected _handleError = (error: AxiosError) => {
    return Promise.reject(error);
  };

  public login = async (payload: { username: string; password: string }) =>
    await this.instance.post(`/auth/login`, payload).then((res) => {
      this.instance.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.token;
      return res;
    });
  //product methods
  public product = {
    getAllProducts: async (params?: IQuery) =>
      await this.instance.get(`/products`, { params }),
    getProduct: async (id: number) =>
      await this.instance.get(`/products/${id}`),
    getAllCategories: async () =>
      await this.instance.get(`/products/categories`),
    getProductsByCategory: async (category: string) =>
      await this.instance.get(`/products/category/${category}`),
    addProduct: async (product: Omit<IProduct, "id">) =>
      await this.instance.post(`/products`, product),
    updateProduct: async (id: number, product: Omit<IProduct, "id">) =>
      await this.instance.patch(`/products/${id}`, product),
    deleteProduct: async (id: number) =>
      await this.instance.delete(`/products/${id}`),
  };

  // cart methods
  public cart = {
    getAllCarts: async (params?: IQuery) =>
      await this.instance.get(`/carts`, { params }),
    getCart: async (id: number) => await this.instance.get(`/carts/${id}`),
    getUserCarts: async (userId: number) =>
      await this.instance.get(`/carts/user/${userId}`),
    addToCart: async (cart: Omit<ICart, "id">) =>
      await this.instance.post(`/carts`, cart),

    updateCart: async (id: number, cart: Omit<ICart, "id">) =>
      await this.instance.patch(`/carts/${id}`, cart),
    deleteCart: async (id: number) =>
      await this.instance.delete(`/carts/${id}`),
  };

  // user methods
  public user = {
    getAllUsers: async (params?: IQuery) =>
      await this.instance.get(`/users`, { params }),
    getUser: async (id: number) => await this.instance.get(`/users/${id}`),
    addUser: async (user: Omit<IUser, "id">) =>
      await this.instance.post(`/users`, user),
    updateUser: async (id: number, user: Omit<IUser, "id">) =>
      await this.instance.patch(`/users/${id}`, user),
    deleteUser: async (id: number) =>
      await this.instance.delete(`/users/${id}`),
  };
}

export default Api;
