import { LocationCity, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '@firebase/util'
import app from '../firebase'
import { userRequest } from '../requestMethods'


const User = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [user, setUser] = useState([])
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [values, setAddress] = useState([])
    
    useEffect(() => {
        const getUser = async () => {
            await userRequest.get(`/users/find/${currentUser._id}`).then((res) => {
                setUser(res.data)
            }).catch((err) => {
                alert('Datas exists in db!')
                console.log(err)
            })
        }
        
        getUser()
    },[currentUser])
    
    useEffect(()  => {
        const recursiveAction = async (order) => {
            const city = (order.city.concat(', ').concat(order.country))
            const comp = order.line1.split(',', 2)
            const address = [{city:city, street:comp[0], code:order.postal_code, comp:comp[1]}]
            await userRequest.put(`/users/${currentUser._id}`, {address:address}).then((res) => {  
                console.log(res.data)  
            }).catch((err) => {
                console.log(err)
            })   
        }
        const getOrder = async () => {
            await userRequest.get(`/orders/find/${currentUser._id}`).then((res) => {
                const order = res.data.filter((item) => item.address)
                const topic = order[0].address
                if(!isEmpty(topic)){
                    recursiveAction(topic)
                }
            }).catch((err) => {
                console.log("error order"+err);
            })
        };
        getOrder()
    }, [ currentUser])

    const handleChange = (e) => {
        e.preventDefault()
        setInputs(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }  
    const handleAddress = (e) => {
        e.preventDefault()
        setAddress(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }
    const submitRecursive = async (user) => {    
        await userRequest.put(`/users/${currentUser._id}`, user).then((res) => {  
            console.log(res.data)  
        }).catch((err) => {
            console.log(err)
        })
        window.location.reload(true)        
    }
    const submitForm = async (e) => {
        e.preventDefault()
        if(!isEmpty(values) && file === null){
            const result = {...inputs, address:values}
            submitRecursive(result)
        }
        else if(file === null){         
            const result = {...inputs}
            submitRecursive(result)
        }
        else {
          const fileName = new Date().getTime() + file.name 
          const storage = getStorage(app) 
          const storageRef = ref(storage, fileName)
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
                default:
              }
            },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
                // ...
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;

                default:
                    break;
              }
            },
            async () => {
              // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
                    if(!isEmpty(values)){ 
                        const result = {...inputs, address:values, img:downloadURL }
                        submitRecursive(result)
                    }else {
                        const result = {...inputs, img: downloadURL}
                        submitRecursive(result)
                    }    
                });
            }
          );
        }
    }
    return (<>
        <Navbar />
        <Announcement />
            <div className="container-lg mt-3 " style={{marginTop:'0px'}}>
                <div className='user'> 
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img src={user.img} alt="img user" className="userShowImg" />
                                <div className="userShowTopTitle">
                                    <span className="userShowUsername">{user.name} </span>
                                    <span className="userShowUserTitle">Software Engineer</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="userShowTitle">Account Details</span>
                                <div className="userShowInfo">
                                    <PermIdentity className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{user.username}</span>
                                </div>
                                <div className="userShowInfo">
                                    <PermIdentity className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{user.gender}</span>
                                </div>
                                <span className="userShowTitle">Contact Details</span>
                                <div className="userShowInfo">
                                    <PhoneAndroid className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{user.phone || 'Null'}</span>
                                </div>
                                <div className="userShowInfo">
                                    <MailOutline className='userShowIcon'/>
                                    <span className="userShowInfoTitle">{user.email}</span>
                                </div>
                                <div className="userShowInfo">
                                    <LocationCity className='userShowIcon'/>
                                    <span className="userShowInfoTitle">Santa Maria, Brasil</span>
                                </div>

                            </div>
                        </div>
                        
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Update Credentials</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Full Name</label>
                                        <input type='text'
                                            placeholder={user.name}
                                            className='userUpdateInput'
                                            name='name'
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Username</label>
                                        <input type='text'
                                            placeholder={user.username}
                                            className='userUpdateInput'
                                            name='username'
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Email</label>
                                        <input type='email'
                                            placeholder={user.email}
                                            className='userUpdateInput'
                                            name='email'
                                            onChange={handleChange}
                                        ></input>
                                    </div>

                                    <div className="userUpdateItem">
                                        <label>Phone</label>
                                        <input type='text'
                                            placeholder={user.phone || 'Null'}
                                            className='userUpdateInput'
                                            name='phone'
                                            onChange={handleChange}
                                        ></input>
                                    </div>

                                    <div className="userUpdateItem">
                                    <label>Gender: </label>      
                                        <select name='gender' id='gender' onChange={handleChange}>
                                            <option for='gender' selected>Select</option>
                                            <option value='male' for='gender'>Male</option>
                                            <option value='female' for='gender'>Female</option>
                                        </select>
                                    </div>    
                                    {user.address?.map((item) => (                           
                                    <div className="userUpdateItem">
                                        <span className="userUpdateTitle" style={{margin:'0px 0px 20px 0px'}}>Address Details</span>
                                        <label>Street, locale </label>
                                        <input type='text'
                                            placeholder={item.street || 'null'}
                                            className='userUpdateInput'
                                            name='street'
                                            onChange={handleAddress}
                                        ></input>
                                        <label>Postal Code</label>
                                        <input type='text'
                                            placeholder={item.code || 'null'}
                                            className='userUpdateInput'
                                            name='code'
                                            onChange={handleAddress}
                                        ></input>
                                        <label>Complement</label>
                                        <input type='text'
                                            placeholder={item.comp || 'null'}
                                            className='userUpdateInput'
                                            name='comp'
                                            onChange={handleAddress}
                                        ></input>
                                        <label>City, Country</label>
                                        <input type='text'
                                            placeholder={item.city || 'null'}
                                            className='userUpdateInput'
                                            name='city'
                                            onChange={handleAddress}
                                        ></input>
                                    </div>
                                    ))}        
                                </div>

                                <div className="userUpdateRight">
                                    <div className="userUpdateUpload">
                                        <img src={user.img}
                                        alt="update profile" className="userUpdateImage" />
                                        <label htmlFor='file'><Publish className='updateIcon' /></label>
                                        <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
                                    </div>
                                    <button className="userUpdateButton" onClick={submitForm}>Update</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        <Newsletter />
        <Footer />
    </> )
}

export default User