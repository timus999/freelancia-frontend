import React from "react";
import "./Footer.scss"
const Footer = () =>{
    return(
        <div className="footer">
        {/* inside footer */}

          <div className="container">
          {/* inside container */}
             <div className="top">
               <div className="item">
                <h2> Categories</h2>
                <span>Graphics Design</span>
                <span>Digital Marketing</span>
                <span>Writting & Translation</span>
                <span>Video & Animatoon</span>
                <span>Web Development</span>
                <span>UI/UX Designing</span>
                <span>Data Scientist</span>
               </div>

               <div className="item">
                <h2> Resources</h2>
                <span>Help & Support</span>
                <span>Success stories</span>
                <span>Freelancia Services</span>
                <span>Blog</span>
                <span>Release Note</span>
                
               </div>

               <div className="item">
                <h2> Company</h2>
                <span>About Us</span>
                <span>Patners</span>
                <span>Contact Us</span>
                <span>Our Impact</span>
                <span>Press</span>
                <span>Leadership</span>
               </div>


               <div className="item">
                <h2> For Clients</h2>
                <span> How to hire</span>
                <span>Project Catalog</span>
                <span>Business plus</span>
                <span>Direct contracts</span>
               </div>

             </div>


<hr/>
             <div className="bottom">
                <div className="left">
                    <h2>Freelancia</h2>
                    <span>Freelancia Ltd. 2025</span>
                </div>
                <div className="right">
                    <div className="social">
                        <img src="./img/insta.png" alt="" />
                        <img src="./img/facebook.png" alt="" />
                        <img src="./img/twitter.png" alt="" />
                        <img src="./img/youtube.png" alt="" />
                        <img src="./img/linkedin.png" alt="" />
                    </div>
                    <div className="link">
                        <span>English</span>
                    </div>
                </div>
             </div>

       {/* container ending */}
          </div>
        {/* footer ending */}
        </div> 
        
    )
}

export default Footer;