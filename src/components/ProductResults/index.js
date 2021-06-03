import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { fetchProductsStart } from '../../redux/Products/products.actions'
import FormSelect from '../forms/FormSelect'
import LoadMore from '../LoadMore'
import Product from './Product'
import './styles.scss'

const ProductResults = props => {
  const products = useSelector(state => state.productsData.products)
  const dispatch = useDispatch()
  const history = useHistory()
  const { filterType } = useParams()

  const { data, queryDoc, isLastPage } = products

  console.log('ProductResults component rendered')
  console.log({ products })

  useEffect(() => {
    dispatch(
      fetchProductsStart({ filterType })
    )
  }, [dispatch, filterType])

  if (!Array.isArray(data)) return null
  if (data.length < 1) {
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

  const handleLoadMore = () => {
    console.log(`handleLoadMore`)
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    )
  }

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
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
        {data.map((product, index) => {
          const { productThumbnail, productName, productPrice } = product
          if (!productThumbnail || !productName || typeof (productPrice) === 'undefined') return null
          const configProduct = { ...product }
          return <Product key={index} {...configProduct} />
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}

    </div>
  )
}

export default ProductResults