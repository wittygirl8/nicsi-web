import React from 'react'
const Footer = () => {
    return (
        <React.Fragment>      
            {/* /.content-wrapper */}
            <footer style={{zIndex:0}} className="main-footer">
                <strong>Copyright © 2020-2021 <a href="https://www.aeologic.com/">Aeologic.com</a>.</strong>
                All rights reserved.
                {/* <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.1.0
                </div> */}
            </footer>
            {/* Control Sidebar */}
            <aside className="control-sidebar control-sidebar-dark">
                {/* Control sidebar content goes here */}
            </aside>
            {/* /.control-sidebar */}
            {/* ./wrapper */}
        </React.Fragment>
    )
}
export default Footer;
