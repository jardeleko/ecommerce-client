import styled from 'styled-components'
import {Facebook, Instagram, Twitter, LinkedIn, Room, WhatsApp, MailOutline} from '@material-ui/icons'

const ContactItem = styled.div`
    display:flex;
    margin-bottom: 20px;
`

const Logo = styled.h3`
    margin-left: 20px;
    margin-top: 10px ;
`
const Payment = styled.img`
    margin-top:5px ;
    width: 270px;
    height: 78px
`

const Desc = styled.p`
    margin-top:10px ;
    margin-left: 20px;
    margin-bottom:20px;
`


const SocialIcon = styled.div`
    margin:10px;
    margin-left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color:white;
    background-color: #${props =>props.color};
    display: inline;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    padding: 5px;
`

const Footer = () => {
    const content = (<>
        <footer className="text-center text-lg-start text-muted" style={{backgroundColor:'#f0f0f0'}}>
        <section className="d-flex justify-content-center justify-content-lg-between p-2" style={{backgroundColor:'white', marginBottom:'0px'}}>
            <div className="me-5 d-none d-lg-block" style={{color:'black'}}>
            <span>Get connected with us on social networks:</span>
            </div>
            <div style={{color:'black'}}>
                <a href="https://www.facebook.com/JardelDuart" className="me-4 text-reset">
                    <i><SocialIcon color="3b5999"><Facebook/></SocialIcon></i>                        
                </a>
                <a href="https://twitter.com/jardeleko" className="me-4 text-reset">
                    <i><SocialIcon color="55acee"><Twitter/></SocialIcon></i>
                </a>
            
                <a href="https://www.instagram.com/jardeleko/" className="me-4 text-reset">
                    <i><SocialIcon color="e4405f"><Instagram/></SocialIcon></i>
                </a>
                <a href="https://www.linkedin.com/in/jardeleko/" className="me-4 text-reset">
                    <i><SocialIcon color="0e76a8"><LinkedIn/></SocialIcon></i>
                </a>
           
            </div>
    
        </section>

        <section className="" style={{backgroundColor:'#f0f0f0', marginTop:'0px'}}>
            <div className="container text-center text-md-start mt-5" style={{color:'black'}}>
    
            <div className="row mt-3" style={{color:'black'}}>
                
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4" style={{color:'black'}}>
        
                <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3"></i><Logo>SANTA COLINA</Logo>
                </h6>
                <p>
                <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur placerat ipsum, eget fringilla nisi mollis vitae. Nulla nec libero vehicula, egestas turpis in, iaculis nunc. Aenean lobortis libero in ornare tincidunt. Fusce a placerat odio. Cras sollicitudin consequat mauris, eu ullamcorper nibh pulvinar eu.</Desc>
                </p>
                </div>
                
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
     
                <h6 className="text-uppercase fw-bold mb-4">
                    Products
                </h6>
                <p>
                    <a href="#!" className="text-reset">Angular</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">React</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Vue</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Laravel</a>
                </p>
                </div>
                
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
               
                <h6 className="text-uppercase fw-bold mb-4">
                    Useful links
                </h6>
                <p>
                    <a href="#!" className="text-reset">Man Fashion</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Women Fashion</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Accessories</a>  
                </p>
                <p>
                    <a href="#!" className="text-reset">Order Tracking</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Whisilist</a>
                </p>
                <p>
                    <a href="#!" className="text-reset">Terms</a>
                </p>
                </div>
                
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                
                
                
                <h6 className="text-uppercase fw-bold mb-4">
                    Contactame
                </h6>
                <p><ContactItem><Room style={{marginRight:"10px", color:"gray"}}/>Santa Maria, RS-Brasil.</ContactItem></p>
                <p><ContactItem><WhatsApp style={{marginRight:"10px", color:"#25D366"}}/>+55 (49) 988331283 </ContactItem></p>
                <p><ContactItem><MailOutline style={{marginRight:"10px", color:"#EA4335"}}/>jardelduarte594@gmail.com</ContactItem></p>
                <p><Payment src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1SuQQZ_2S38tsdhWRwrVHi1uf1z7D6sqCNw&usqp=CAU" style={{borderRadius:'20px'}}/></p>
                </div>
                
            </div>
            </div>
        </section>
        
        <div className="text-center p-4">
            © 2021 Copyright:
            <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
        </footer>
        </>)
        
  return content
}

export default Footer