import React from 'react';
import './landingpage.css';
const MainBody = () => {
    return (
        <React.Fragment>
             <section className="container main_body" style={{zIndex:'1'}}>
                 <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 animation1">
                        <h1 className="module_header">Connecting your business to the technology resources you need.</h1>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 animation2">                        
                            <img src="https://linkedofy.io/wp-content/uploads/2020/04/full_vector.png" style={{ width:'100%', height:'50vh', position:'relative' }} alt='image'/>
                    </div>
                    </div>
                        <div className="et_pb_fullwidth_header_overlay" />
                        <div className="et_pb_fullwidth_header_scroll" />
                </section>
        </React.Fragment>
    )
}
export default MainBody;