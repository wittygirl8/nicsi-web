import React from 'react';
import './landingpage.css';
import MainBody from './mainbody'
import LandingHeader from '../../Components/Header/landingheader/landingheader';
import LandingFooter from '../../Components/Footer/landingfooter/landingfooter';
const HomePage = () => {
    return (
        <React.Fragment>
            < div className='head_page'>
            <LandingHeader/>
                <div className="home_content">
                    <MainBody/>
                </div>
                <LandingFooter/>
            </div>
        </React.Fragment>
    )
}
export default HomePage;