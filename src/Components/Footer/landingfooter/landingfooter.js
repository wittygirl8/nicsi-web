import React from 'react'
const MainFooter = () => {
    return (
        <React.Fragment>
         <footer className='fixed-bottom' style={{background: 'transparent', height:'5vh', width:'100vw', zIndex:1}}>
            <div className="copyright">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm-12 col-lg-12 col-md-12" style={{color:'white'}}>
                            <p> © 2020-21 Copyright Aeologic.</p>
                        </div>
                    </div>
                </div>     
            </div>
         </footer>
        </React.Fragment>
    )
}
export default MainFooter;
