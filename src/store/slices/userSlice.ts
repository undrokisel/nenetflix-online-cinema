import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { FirebaseError } from "firebase/app";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  signOut,
  User,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "services";
import { API_ROUTES } from "services/Laravel/routes";
import { axiosPost } from "services/apiService";
import { IMovieShort, IRequestParams, ISettings, IUserSignIn, IUserSignUp } from "types";
import { getLaravelErrorMessage } from "utils/utils";

export interface IOrderItem extends IMovieShort {
  price: number;
}

export interface IUserState {
  name: string | null;
  surname: string | null;
  patronimic: string | null;
  login: string | null;
  email: string | null;
  agreement: boolean;
  is_admin: boolean;

  favorites: IMovieShort[];
  orders: IOrderItem[];
  searchResults: IMovieShort[];
  error: string | null;
  isLogged: boolean;
  isLoading: boolean;
  isLightMode: boolean;
  token: string | null;
}

const initialState: IUserState = {
  name: null,
  surname: null,
  patronimic: null,
  login: null,
  email: null,
  agreement: false,
  is_admin: false,
  token: null,
  favorites: [],
  orders: [],
  searchResults: [],
  error: null,
  isLogged: false,
  isLoading: false,
  isLightMode: false,
};

export const signUp = createAsyncThunk<
  {
    name: string;
    surname: string;
    patronimic: string;
    login: string;
    email: string;
    password: string;
    agreement: boolean;
    token?: string;
  },
  IUserSignUp,
  { rejectValue: string }
>(
  "user/signUp",
  async ({ name, surname, patronimic, login, email, password, agreement }, { rejectWithValue }) => {
    try {
      const response = await axiosPost(API_ROUTES.SIGN_UP, {
        name,
        surname,
        patronimic,
        login,
        email,
        password,
        agreement,
      });

      if (response.status !== 201) {
        throw new Error("Registration failed");
      }

      const token = response.data.token ?? null;

      return { name, surname, patronimic, login, email, password, agreement, token };
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.response) {
        for (const field in error.response.data) {
          if (Array.isArray(error.response.data[field]) && error.response.data[field].length > 0) {
            errorMessage = `${error.response.data[field][0]}`;
          }
          break;
        }
      }
      return rejectWithValue(errorMessage);
    }
  },
);


// signIn
export const signIn = createAsyncThunk<
  {
    name: string;
    surname: string;
    patronimic: string;
    login: string;
    email: string;
    password: string;
    token?: string;
    is_admin: boolean;
  },
  IUserSignIn,
  { rejectValue: string }
>("user/signIn", async ({ login, password }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<any> = await axiosPost(API_ROUTES.SIGN_IN, {
      login,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    if (response.data) {
      const token = response.data.token ? response.data.token : null;
      const { name, surname, login, email, password, patronimic, is_admin } = response.data;
      return { name, surname, login, password, email, token, patronimic, is_admin };
    } else {
      return {
        name: "",
        surname: "",
        login: "",
        email: "",
        password: "",
        token: null,
        patronimic: "",
        is_admin: false,
      };
    }
  } catch (error) {
    let errorMessage = "";
    if (error instanceof AxiosError && error.response) {
      for (const field in error.response.data) {
        // берем первую ошибку из массива, если возвращается массив ошибок
        // или саму ошибку, если она в единственном экземпляре и не массив
        if (Array.isArray(error.response.data[field]) && error.response.data.error.length > 0) {
          errorMessage = `${error.response.data[field][0]}`;
        } else {
          errorMessage = `${error.response.data[field]}`;
        }
        break;
      }
    }
    return rejectWithValue(errorMessage);
  }
});

// signUserOut
export const signUserOut = createAsyncThunk<void, undefined, { rejectValue: string }>(
  "user/signUserOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError.code);
    }
  },
);

// reauthentificate
export const reauthentificate = createAsyncThunk<void, ISettings, { rejectValue: string }>(
  "user/reauthentificate",
  async ({ password }, { rejectWithValue }) => {
    const user = auth.currentUser as User;
    const credential = EmailAuthProvider.credential(user.email as string, password);
    try {
      await reauthenticateWithCredential(auth.currentUser as User, credential);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError.code);
    }
  },
);

// updateUserName
export const updateUserName = createAsyncThunk<void, { name: string }, { rejectValue: string }>(
  "user/updateUserName",
  async ({ name }, { rejectWithValue }) => {
    if (auth.currentUser)
      try {
        await updateProfile(auth.currentUser, { displayName: name });
      } catch (error) {
        const firebaseError = error as FirebaseError;
        return rejectWithValue(firebaseError.code);
      }
  },
);

// updateUserEmail
export const updateUserEmail = createAsyncThunk<void, ISettings, { rejectValue: string }>(
  "user/updateUserEmail",
  async ({ email }, { rejectWithValue }) => {
    if (auth.currentUser)
      try {
        await updateEmail(auth.currentUser, email);
      } catch (error) {
        const firebaseError = error as FirebaseError;
        return rejectWithValue(firebaseError.code);
      }
  },
);

// updateUserPassword
export const updateUserPassword = createAsyncThunk<void, ISettings, { rejectValue: string }>(
  "user/updateUserPassword",
  async ({ newPassword }, { rejectWithValue }) => {
    if (auth.currentUser)
      try {
        await updatePassword(auth.currentUser, newPassword);
      } catch (error) {
        const firebaseError = error as FirebaseError;
        return rejectWithValue(firebaseError.code);
      }
  },
);

export interface AddToCartPayload {
  forFavourites: IMovieShort;
  token: string;
}

export interface AddToCartResult {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

// addToFavorites
export const addToFavorites = createAsyncThunk<AddToCartResult, AddToCartPayload>(
  "cart/addToCart",
  async ({ forFavourites, token }, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        API_ROUTES.ADD_MOVIE_CART,
        { forFavourites, token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        const { imdbID, Poster, Title, Type, Year } = response.data;
        return { Poster: Poster, Title: Title, Type: Type, Year: Year, imdbID: imdbID };
      } else if (response.status === 409) {
        throw new Error("item just in cart");
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.message || "An error occurred";
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export interface RemoveFromCartPayload {
  imdbID: string;
  token: string;
}

export interface RemoveFromCartResult {
  message?: string;
  cartItemId?: number;
}

export const removeFromCart = createAsyncThunk<RemoveFromCartResult, RemoveFromCartPayload>(
  "cart/removeFromCart",
  async ({ imdbID, token }, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        API_ROUTES.REMOVE_MOVIE_FROM_CART,
        { imdbID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 204) {
        const responseData = JSON.parse(response.config.data);
        return responseData.imdbID;
      } else if (response.status === 404) {
        throw new Error("item not found");
      } else {
        throw new Error("Failed to remove item from cart");
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.message || "An error occurred";
      }
      return rejectWithValue(errorMessage);
    }
  },
);

interface GetCartPayload {
  token: string | null;
}

interface GetCartResult {
  message?: string;
  cart?: IMovieShort[] | [];
}

export const getCart = createAsyncThunk<GetCartResult, GetCartPayload>(
  "cart/getCart",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        API_ROUTES.GET_CART,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return { cart: response.data };
      } else if (response.status === 404) {
        throw new Error("cart not found");
      } else {
        throw new Error("Failed to get cart");
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.message || "An error occurred";
      }
      return rejectWithValue(errorMessage);
    }
  },
);

interface GetOrdersPayload {
  token: string | null;
}

interface GetOrdersResult {
  message?: string;
  orders?: IOrderItem[] | [];
}

export const getOrders = createAsyncThunk<GetOrdersResult, GetOrdersPayload>(
  "order/getOrders",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        API_ROUTES.GET_ORDER,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return { orders: response.data };
      } else if (response.status === 404) {
        throw new Error("orders not found");
      } else {
        throw new Error("Failed to get orders");
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.message || "An error occurred";
      }
      return rejectWithValue(errorMessage);
    }
  },
);

interface CreateOrderPayload {
  token: string;
  forFavourites: IMovieShort;
  price: number | undefined;
}

export const createOrder = createAsyncThunk<IOrderItem, CreateOrderPayload>(
  "order/createOrder",
  async ({ token, forFavourites, price }, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        API_ROUTES.CREATE_ORDER,
        { forFavourites, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        return response.data;
      } else if (response.status === 404) {
        throw new Error("order not found");
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.message || "An error occurred";
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export interface RemoveOrderResult {}

export interface RemoveOrderPayload {
  imdbID: string;
  token: string;
}

export const removeFromOrders = createAsyncThunk<RemoveOrderResult, RemoveOrderPayload>(
  "cart/removeFromOrders",
  async ({ imdbID, token }, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        API_ROUTES.REMOVE_MOVIE_FROM_ORDERS,
        { imdbID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 204) {
        const responseData = JSON.parse(response.config.data);
        return responseData.imdbID;
      } else if (response.status === 404) {
        throw new Error("order not found");
      } else {
        throw new Error("Failed to remove order from orders");
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.message || "An error occurred";
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    updateUserCredentials: (state) => {
      if (auth.currentUser) {
        state.name = auth.currentUser.displayName;
        state.email = auth.currentUser.email;
      }
    },
    toggleColorMode: (state, { payload }: PayloadAction<boolean>) => {
      state.isLightMode = payload;
    },

    searchInFavourites: (state, { payload }: PayloadAction<IRequestParams>) => {
      state.searchResults = state.favorites.filter((movie) =>
        movie.Title.toLowerCase().match(payload.s.toLowerCase()),
      );
    },
  },

  // signUp
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLogged = true;
      state.name = payload.name;
      state.surname = payload.surname;
      state.email = payload.email;
      state.patronimic = payload.patronimic;
      state.login = payload.login;
      if (payload.token) {
        state.token = payload.token;
      }
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload);
      }
    });

    // signIn
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLogged = true;
      state.name = payload.name;
      state.surname = payload.surname;
      state.email = payload.email;
      state.patronimic = payload.patronimic;
      state.login = payload.login;
      state.is_admin = payload.is_admin;

      if (payload.token) {
        state.token = payload.token;
      }
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload as string);
      }
    });

    // signUserOut
    builder.addCase(signUserOut.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUserOut.fulfilled, (state) => {
      state.isLoading = false;
      state.isLogged = false;
      state.name = null;
      state.email = null;
      state.favorites = [];
      state.orders = [];
      state.surname = null;
      state.patronimic = null;
      state.login = null;
      state.is_admin = false;
      state.token = null;
    });
    builder.addCase(signUserOut.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload);
      }
    });

    // reauthentificate
    builder.addCase(reauthentificate.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(reauthentificate.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload);
      }
    });

    // addMovieToCart
    builder.addCase(addToFavorites.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addToFavorites.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.favorites.push(payload as IMovieShort);
    });
    builder.addCase(addToFavorites.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload as string);
      }
    });

    // createOrder
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orders.push(payload);
    });
    builder.addCase(createOrder.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload as string);
      }
    });

    // removeFromCart
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.favorites = state.favorites.filter((movie) => movie.imdbID !== payload);
    });
    builder.addCase(removeFromCart.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload as string);
      }
    });

    // getCart
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      if (payload.cart) {
        state.favorites = [...payload.cart];
      }
    });
    builder.addCase(getCart.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload as string);
      }
    });

    // getOrders
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      if (payload.orders) {
        state.orders = [...payload.orders];
      }
    });
    builder.addCase(getOrders.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload as string);
      }
    });

    // removeFromOrders
    builder.addCase(removeFromOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeFromOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orders = state.orders.filter((movie) => movie.imdbID !== payload);
    });
    builder.addCase(removeFromOrders.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload as string);
      }
    });

    // updateUserName
    builder.addCase(updateUserName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserName.fulfilled, (state) => {
      state.isLoading = false;
      state.isLogged = true;
    });
    builder.addCase(updateUserName.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload);
      }
    });

    // updateUserEmail
    builder.addCase(updateUserEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserEmail.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserEmail.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = getLaravelErrorMessage(payload);
      }
    });

    // updateUserPassword
    builder.addCase(updateUserPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserPassword.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = payload;
      }
    });
  },
});

export const { resetError, updateUserCredentials, toggleColorMode, searchInFavourites } =
  userSlice.actions;
export default userSlice.reducer;
