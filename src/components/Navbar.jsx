import { ShoppingCartOutlined } from '@material-ui/icons'
import Badge from '@material-ui/core/Badge'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../redux/userRedux'
import { resetSkill } from '../redux/cartRedux'
import { useNavigate } from 'react-router'

const LS = styled(Link)`
    cursor:pointer;
    font-weight:bold;
    color: #fec400 !important;
    &:hover{        
        color:white !important;
        text-decoration:none;
    }
`
const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    const currentUser = useSelector((state) => state.user.currentUser); 

    const history = useNavigate()
    const dispatch = useDispatch()
    const handleEvent = (e) => {
        e.preventDefault()
        dispatch(resetSkill())
        dispatch(logOut())
        history('/login')
    }
    // const miFunc = (name) => {
    //     const [fisrt, ...others] = name.split(" ");
    //     others.push('.') 
    //     return fisrt.toUpperCase()
    // }   

    const navbar = ( 
    <nav className="navbar navbar-expand-lg navbar-dark">  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
            </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            { currentUser 
            ? <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">
                        <img src={currentUser.img}  alt="img user" style={{borderRadius:'150px', width:'40px', height:'40px', objectFit:"cover"}}/>                     
                    </a>
                    <div className="dropdown-menu"> 
                    <a className="dropdown-item" href="/profile"> Perfil</a>
                    <a className="dropdown-item" href="/orders"> Orders</a>
                    <a className="dropdown-item" href="/likes"> Favorite</a>
                    </div>
                </li>
              </ul>
            : <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/register">REGISTER </a>
                </li>
              </ul>
            }
            <ul className="navbar-nav ml-left">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">
                    WOMEN CLOTHES
                    </a>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={'/products/t-shirt'}>Tshirts</Link>
                        <Link className="dropdown-item" to={'/products/minidress'}>Mini Dress</Link>
                        <Link className="dropdown-item" to={'/products/dress'}>Dresses</Link>
                        <Link className="dropdown-item" to={'/products/shorts'}>Shorts</Link>
                        <Link className="dropdown-item" to={'/products/jacket'}>Jackets</Link>
                        <Link className="dropdown-item" to={'/products/jeans'}>Jeans</Link>
                        <Link className="dropdown-item" to={'/products/accessories'}>Accessories</Link>
                        <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to={'/products/women'}>ALL ITEMS</Link>
                    </div>
                </li>
            </ul>
            <div className="navbar-nav mx-auto">
                <h2>
                    <LS to={`/`}> SANTA COLINA </LS>
                </h2>
            </div>
            <ul className="navbar-nav ml-right">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">
                    MEN CLOTHES
                    </a>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={'/products/shirt'}>Tshirts</Link>
                        <Link className="dropdown-item" to={'/products/polo'}>Polo</Link>
                        <Link className="dropdown-item" to={'/products/bermuda'}>Bermuda</Link>
                        <Link className="dropdown-item" to={'/products/suit'}>Suits</Link>
                        <Link className="dropdown-item" to={'/products/jacket'}>Jackets</Link>
                        <Link className="dropdown-item" to={'/products/jeans'}>Jeans</Link>
                        <Link className="dropdown-item" to={'/products/accessories'}>Accessories</Link>
                        <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to={'/products/man'}>ALL ITEMS</Link> 
                    </div>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">    
                <li className="nav-item">
                    {currentUser 
                        ? <a className="nav-link" aria-current="page" href="/" onClick={handleEvent}>LOGOUT</a>
                        : <a className="nav-link" aria-current="page" href="/login">SIGN IN</a>
                    }
                </li>
                <li className="nav-item" >
                    <a className="nav-link" href='/cart' tabindex="-1">
                        <Badge 
                            badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </a>
                </li>
            </ul>
        </div>        
    </nav>)
    return navbar
}

export default Navbar;