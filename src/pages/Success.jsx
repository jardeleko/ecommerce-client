import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import styled from "styled-components"
import { resetSkill } from "../redux/cartRedux"
import img from '../assets/success.png'
import { userRequest } from "../requestMethods"

const Container = styled.div`
  width:100%;
  height: 100vh;
  background-color: white;    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`
const Image = styled.img`
  width:50%;
  height: 50vh;
  align-items: center;
  justify-content: center;
`
const Button = styled.button`
  cursor:pointer;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid gray;
  border-radius:10px;
  background-color: green;
  color:#fff;
`
const Success = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useNavigate()
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.data;
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState('');
  const returnReset = () => {
    dispatch(resetSkill(), history('/'))
  }
  const action = setTimeout(() => {
    dispatch(resetSkill())
    history('/') 
 }, 3500);

  useEffect(()  => {
    
    if(cart.total !== 0){
      async function createOrder() {
        await userRequest.post("/orders", 
          {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
            productName: item.title,
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        }).then((res) => {
          setOrderId(res.data._id);
        }).catch((err) => {
            console.log("error order"+err);
        })
      }
      createOrder()
    }else {
      console.log('Problem within order, payment != minimum')
    }
  }, [cart, data, currentUser]);

  return (
    <Container >
      <Image src={img}/>
        <span>{orderId && action
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
        </span>
        <Button onClick={returnReset}>Go to Homepage</Button>
          
    </Container>
  );
};

export default Success;