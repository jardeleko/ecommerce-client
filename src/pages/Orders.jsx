
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import { userRequest } from '../requestMethods'

const Orders = () => {
    const [message, setMessage] = useState("")
    const [orderId, setOrder] = useState("")
    const [feed, setFeedback] = useState('')
    const currentUser = useSelector((state) => state.user.currentUser)
    const [orders, setOrders] = useState("")
    
    const handleSubmit = async () => {
        console.log(orderId)
        const result = {userId:currentUser._id, email:currentUser.email, orderId:orderId, message:message}
        console.log(result)
        await userRequest.post('/reports', result).then((res) => {
            console.log('create report' + res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(()  => {
        const getOrder = async () => {
          await userRequest.get(`/orders/find/${currentUser._id}`).then((res) => {
            setOrders(res.data)  
            }).catch((err) => {
              console.log("error order"+err);
            })
        };
        getOrder();
    }, [ currentUser]);


    const Button = ({type, value}) => {
        if(type === 'declined'){
            return <button className={'widgetLgButton '+type} onClick={()=>setFeedback(value)} data-toggle="modal" data-target="#teste">{type}</button>    
        }else{
            return <button className={'widgetLgButton '+type}>{type}</button>
        }
        
    }
    const content = (       
        <><ul>
            {orders.length !== 0
            ?
            orders?.map((ord, index) => (
            <li key={ord._id}>
                <hr style={{width:'50%',textAlign:'left', marginLeft:'0'}}/>
                    <div className="container-fluid">
                        <div className="container">
                            <div className="container">
                                <fieldset>
                                <div className="col-md-12">
                                    <div>
                                        <h5 style={{fontWeight:'bold'}}>Client: {currentUser.name}</h5>
                                        <span>Created: {dateFormat(ord.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span><br/>
                                        <span>Order id: {ord._id}</span> 
                                    </div><br/>
                                    <h5 style={{fontWeight:'bold'}}>Products:</h5>{ord.products.map((item) => (
                                        <div>
                                            <span>Product: {item.productName}</span><br/>    
                                            <span>Quantity: {item.quantity}</span>
                                        </div>
                                    ))}
                                    <br />
                                    <div className="valid-feedback"></div>
                                    <div className="invalid-feedback">Username field cannot be blank!</div>
                                    </div>
                                    <div className="col-md-12">
                                        <h5 style={{fontWeight:'bold'}}>Adress:</h5>
                                        <div>
                                            <span>Street: {ord.address.line1}</span><br/>
                                            <span>postal: {ord.address.postal_code}</span><br/>
                                            <span>city: {ord.address.city}</span><br/>
                                            <span>country: {ord.address.country}</span><br/>
                                            <span>your product arrive in maximum 15 days</span><br/>
                                        </div>
                                    </div>
                
                                    <div className="styledButtons">
                                       <Button 
                                            type={ord.status} 
                                            value={ord.feedback}
                                            style={{marginLeft:'10px', 
                                            backgroundColor:'blue', 
                                            padding:'8px', 
                                            borderRadius:'10px', 
                                            color:'white', 
                                            border:'none', 
                                            fontWeight:'bold'}}/>
                                        <button 
                                            type="button" 
                                            className="staticBtn" 
                                            data-toggle="modal" 
                                            data-target="#exampleModal"
                                            value={ord._id} 
                                            onClick={(e) => setOrder(e.target.value) && setFeedback(index)}>Report problem
                                        </button>
                                    </div>
                                    <div>
                                        <div class="d-flex justify-content-center mt-5">
                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Contact us</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="md-form mb-4 pink-textarea active-pink-textarea-2">
                                                            <i class="fas fa-angle-double-right prefix"></i>
                                                            <label for="form23">Include on message all problems with order request:</label>
                                                            <textarea 
                                                                id="form23" 
                                                                class="md-textarea form-control" 
                                                                rows="3" 
                                                                placeholder='write were...'
                                                                onChange={(e) => setMessage(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button 
                                                            type="button" 
                                                            class="btn btn-primary" 
                                                            data-dismiss="modal" 
                                                            onClick={handleSubmit}
                                                        >Send Message</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="d-flex justify-content-center mt-5">
                                            <div class="modal fade" id="teste" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Warning...</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span> 
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="md-form mb-4 pink-textarea active-pink-textarea-2">
                                                            <i class="fas fa-angle-double-right prefix"></i>
                                                            <label for="form23">{feed}</label>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <hr style={{width:'50%',textAlign:'left', marginLeft:'0'}}/>
            </li>))
    : <h4 style={{textAlign:'center', margin:'300px'}}>you dont have orders, buy now!</h4>
    }</ul></>)  

  return (
    <div>
        <Navbar />
        {content}
        <Footer />
    </div>
  )
}

export default Orders