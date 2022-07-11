import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { userRequest } from '../requestMethods'

const RemoveItem = () => {
  const location = useLocation('')
  const id = location.pathname.split("/")[2]
  const currentUser = useSelector((state) => state.user.currentUser)
  
  useEffect(() => {
    const reqAndRemove = async (itemDelete) => {
      const aux = itemDelete[0]._id
      console.log(aux)
      await userRequest.delete(`/likes/${aux}`).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
    const reqList = async () => {
      await userRequest.get(`/likes/find/${currentUser._id}`).then( async(res) => {
        const itemDelete = res.data.filter((item) => item.productId === id)
        reqAndRemove(itemDelete)
      }).catch((err) => {
        console.log(err)
      })
    }
    reqList()
  }, [currentUser, id])

  setTimeout(() => {
    window.history.back() 
  }, 500);
   
}

export default RemoveItem