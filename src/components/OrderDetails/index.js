import React, { useEffect } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setOrderDetails } from '../../redux/Orders/orders.actions'

const columns = [
  {
    id: 'productThumbnail',
    label: '',
  },
  {
    id: 'productName',
    label: 'Name',
  },
  {
    id: 'productPrice',
    label: 'Price',
  },
  {
    id: 'quantity',
    label: 'Quantity',
  }
]

const styles = {
  fontSize: '16px',
  width: '10%',
}

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case 'productPrice':
      return `$${columnValue}`
    case 'productThumbnail':
      return <img alt="thumbnail" src={columnValue} width={250} />
    default:
      return columnValue
  }
}

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(
        setOrderDetails({})
      )
    }
  }, [])

  const orderItems = order && order.orderItems
  console.log({ orderItems })

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => {
              return (
                <TableCell key={index} style={styles}>
                  {col.label}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orderItems) && orderItems.length > 0 && orderItems.map((row, index) => {
            return (
              <TableRow key={index}>
                {columns.map((col, index) => {
                  const columnName = col.id
                  const columnValue = row[columnName]

                  return (
                    <TableCell key={index} style={styles}>
                      {formatText(columnName, columnValue)}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderDetails