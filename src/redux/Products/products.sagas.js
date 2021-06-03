import { all, call, takeLatest, put } from "@redux-saga/core/effects";
import { auth } from "../../firebase/utils";
import { fetchProductsStart, setProduct, setProducts } from "./products.actions";
import { handleAddNewProduct, handleDeleteProduct, handleFetchProduct, handleFetchProducts } from "./products.helpers";
import productTypes from "./products.types";

export function* addNewProduct({ payload }) {
  try {
    const timestamp = new Date()
    yield handleAddNewProduct({
      ...payload,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    })
    yield put(
      fetchProductsStart()
    )
  } catch (error) {
    console.log(error)
  }
}

export function* onAddNewProductStart() {
  yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addNewProduct)
}

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload)
    yield put(
      setProducts(products)
    )
  } catch (error) {
    console.log(error)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
  console.log('deleteProduct saga reached')
  try {
    yield handleDeleteProduct(payload)
    yield put(
      fetchProductsStart()
    )
  } catch (error) {
    console.log(error)
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload)
    yield put(
      setProduct(product)
    )
  } catch (err) {
    console.log(err)
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct)
}

export default function* productSagas() {
  yield all([
    call(onAddNewProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ])
}