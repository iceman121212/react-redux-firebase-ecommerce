import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { fetchProductsStart } from '../../redux/Products/products.actions'
import FormSelect from '../forms/FormSelect'
import Product from './Product'
import './styles.scss'

const ProductResults = props => {
  const products = useSelector(state => state.productsData.products)
  const dispatch = useDispatch()
  const history = useHistory()
  const { filterType } = useParams()

  console.log('ProductResults component rendered')
  console.log({ products })

  useEffect(() => {
    dispatch(
      fetchProductsStart({ filterType })
    )
  }, [dispatch, filterType])

  if (!Array.isArray(products)) return null
  if (products.length < 1) {
    return (
      <div className="products">
        <p>
          No search results.
        </p>
      </div>
    )
  }

  const handleFilter = (e) => {
    const nextFilter = e.target.value
    history.push(`/search/${nextFilter}`)
  }

  const configFilters = {
    defaultValue: filterType,
    options: [{
      name: 'Show all',
      value: '',
    }, {
      name: 'Mens',
      value: 'mens',
    }, {
      name: 'Womens',
      value: 'womens',
    }],
    handleChange: handleFilter
  }

  return (
    <div className="products">
      <h1>
        Browse Products
      </h1>

      <FormSelect {...configFilters} />

      <div className="productResults">
        {products.map((product, index) => {
          const { productThumbnail, productName, productPrice } = product
          if (!productThumbnail || !productName || typeof (productPrice) === 'undefined') return null
          const configProduct = { productThumbnail, productName, productPrice }
          return <Product key={index} {...configProduct} />
        })}
      </div>
    </div>
  )
}

export default ProductResults