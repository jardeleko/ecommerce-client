import { BrowserRouter as Router, Routes as Switch, Route, Navigate} from "react-router-dom"
import ProductList from "./pages/ProductList"
import RemoveItem from "./pages/RemoveItem"
import Exclusive from "./pages/Exclusive"
import { useSelector } from 'react-redux'
import Register from './pages/Register'
import Product from "./pages/Product"
import Success from "./pages/Success"
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Cart from './pages/Cart'
import Fav from './pages/Fav'
import Failed from "./pages/Failed"

const App = () => {
    const user = useSelector((state)=> state.user.currentUser);
    return(
    <Router>
        <Switch>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/products/:category" element={<ProductList/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/failed" element={<Failed />}/>
            <Route path="/likes" element={<Fav/>}/>
            <Route path="/exclusive/:id" element={<Exclusive/>}/>
            <Route path="/remove/:id" element={<RemoveItem />}/>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path = "/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        </Switch>
    </Router>
    )
}

export default App;