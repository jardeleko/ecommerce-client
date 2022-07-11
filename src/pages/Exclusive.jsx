import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { userRequest } from '../requestMethods'


const Exclusive = () => {
  const location = useLocation('')
  const currentUser = useSelector((state) => state.user.currentUser)
  const id = location.pathname.split("/")[2]
  
  useEffect(() => {
    const userId = currentUser._id
    const result = {userId, productId:id}
    const createFav = async () => {
      await userRequest.post('/likes', result).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
    createFav()
  }, [currentUser, id])

  //
    window.history.back()    

}

export default Exclusive