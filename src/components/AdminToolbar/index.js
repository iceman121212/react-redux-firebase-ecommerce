import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkUserIsAdmin } from '../../Utils'
import './styles.scss'

const AdminToolbar = props => {
  console.log('AdminToolbar component')
  const currentUser = useSelector(state => state.user.currentUser)
  const isAdmin = checkUserIsAdmin(currentUser)

  console.log({ currentUser })
  console.log({ isAdmin })

  if (!isAdmin) return null

  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to='/admin'>
            My admin
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminToolbar