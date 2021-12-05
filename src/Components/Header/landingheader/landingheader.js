import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import './landingheader.css';
const MainHeader = ({data}) => {
    const [header, setHeader] = useState('nav-1')
    // const [isShow, setIsShow] = useState(false);
    // useEffect(() => {
    //     window.addEventListener('scroll', listenScrollEvent);
      
    //     return () =>
    //       window.removeEventListener('scroll', listenScrollEvent);
    // }, []);

    // const listenScrollEvent = (event) => {
    //     if (window.scrollY < 573) {
    //       return setHeader("nav-1")
    //     } else if (window.scrollY > 570) {
    //       return setHeader("nav-2")
    //     } 
    //   }
    // const handletoggle = () => {
    //     console.log(isShow)
    //     if(isShow){
    //         setIsShow(false)
    //     }else {
    //         setIsShow(true)
    //     }
    //}
    return (
        <React.Fragment>
        <div className={`${header} fixed-top`}>
            <a href="/">
                <img className="logo" src='/images/AeoTrans.png' alt="logo"/>
            </a>
            <div className="login-container">
                <button type="submit"><Link to="/sign-in" style={{color:'white'}}>Sign In</Link></button>
                <button type="submit"><Link to="/sign-up" style={{color:'white'}}>Sign Up</Link></button>
            </div>
        </div>

        <nav className={`${header} fixed-top`} style={{zIndex: 1}}>
            <a href="/">
                <img className="logo" src='/images/AeoTrans.png' alt="logo"/>
            </a>

            {/* <Link to="/sign-in" className='nav_btn signin'>Sign In</Link>
            <Link to="/sign-up" className='nav_btn signup'>Sign Up</Link> */}

            {/* className={`nav nav-treeview nav-item nav-link ${data === 'contact'? "active": ""}`} */}
            {/* className={data === 'blog'? "active": ""} */}
        </nav>
    </React.Fragment>
    )
}
export default MainHeader;