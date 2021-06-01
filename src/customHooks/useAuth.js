import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"


const useAuth = props => {
  const history = useHistory()
  const currentUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    if (!currentUser) {
      history.push('/login')
    }
  }, [currentUser, history])

  return currentUser
}

export default useAuth