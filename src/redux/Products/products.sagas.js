import { all, call, takeLatest, put } from "@redux-saga/core/effects";
import { auth } from "../../firebase/utils";
import { fetchProductsStart, setProducts } from "./products.actions";
import { handleAddNewProduct, handleDeleteProduct, handleFetchProducts } from "./products.helpers";
import productTypes from "./products.types";

export function* addNewProduct({ payload: {
  productCategory,
  productName,
  productThumbnail,
  productPrice,
} }) {
  try {
    const timestamp = new Date()
    yield handleAddNewProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
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

export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts()
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

export default function* productSagas() {
  yield all([
    call(onAddNewProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ])
}