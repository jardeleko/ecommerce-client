import { FavoriteBorderOutlined, SearchOutlined } from '@material-ui/icons'
import styled from 'styled-components'
import {mobile} from '../responsive'
import {Link} from 'react-router-dom'

const LS = styled(Link)`
  color:white !important;
`;

const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.03);
    z-index:3;
    display:flex;
    align-items:center;
    justify-content:center;
    transition: all 0.5s ease;
    cursor:pointer;
`
const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height:350px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color: #fcfffd;
    position:relative;
    &:hover ${Info}{
      opacity: 1;
    }
    ${mobile({backgroundColor:"#f0f6ff"})}
   
` // cadetblue || cornflowerblue
const Circle = styled.div`
    width:200px;
    height:200px;
    border-radius:50%;
    background-color:white;
    position:absolute;
    ${mobile({backgroundColor:"#f0f6ff"})}

`
const Image = styled.img`
    height:75%;
    z-index:2;
`
const Icon = styled.button`
    width:40px;
    height:40px;
    margin:10px;
    border-radius: 50%;
    border:none;
    background-color:black;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:20;
    transition: all 0.5 ease; &:hover {
        background-color:gray;
        transform:scale(1.2);
    }
    opacity:0.5;
    cursor:pointer;
`

const Product = ({item}) => {
  return (
    <Container>
      <Circle/>
      <Image src={item.img}/>
      <Info>
        <Icon>
          <LS to={`/product/${item._id}`}> 
            <SearchOutlined/>
          </LS>
        </Icon>
        <Icon>
        <LS to={`/exclusive/${item._id}`}> 
          <FavoriteBorderOutlined/>
        </LS>
        </Icon> 
      </Info>   
    </Container>
  )
}

export default Product
