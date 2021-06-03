import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { addToCart } from '../../redux/Cart/cart.actions'
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions'
import Button from '../forms/Button'
import './styles.scss'

const ProductCard = ({ }) => {
  const dispatch = useDispatch()
  const history = useHistory()
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

  const handleAddToCart = (product) => {
    if (!product) return
    dispatch(
      addToCart(product)
    )
    history.push('/cart')
  }

  return (
    <div>
      <div className="productCard">
        <div className="hero">
          <img alt="thumbnail" src={productThumbnail} />
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
                <Button
                  {...configAddToCartBtn}
                  onClick={(evt) => handleAddToCart(product)}
                >
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