import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions'
import Button from '../forms/Button'
import './styles.scss'

const ProductCard = ({ }) => {
  const dispatch = useDispatch()
  const { productID } = useParams()
  const product = useSelector(state => state.productsData.product)
  const {
    productThumbnail,
    productName,
    productPrice,
    productDesc,
  } = product

  useEffect(() => {
    dispatch(
      fetchProductStart(productID)
    )

    return () => {
      dispatch(
        setProduct({})
      )
    }
  }, [dispatch, productID])

  const configAddToCartBtn = {
    type: 'button'
  }

  return (
    <div>
      <div className="productCard">
        <div className="hero">
          <img src={productThumbnail} />
        </div>
        <div className="productDetails">
          <ul>
            <li>
              <h1>
                {productName}
              </h1>
            </li>
            <li>
              <span>
                ${productPrice}
              </span>
            </li>
            <li>
              <div className="addToCart">
                <Button {...configAddToCartBtn}>
                  Add to cart
                </Button>
              </div>
            </li>
            <li>
              <span
                dangerouslySetInnerHTML={{ __html: productDesc }} >
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductCard