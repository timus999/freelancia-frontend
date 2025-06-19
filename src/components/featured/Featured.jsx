import React from "react";
import "./Featured.scss"
const Featured = () => {
    return(
        <div className='featured'>
        {/* inside the container we re gonna have ads type of thing basically middle part of home page
        right ma photo left ma shearch and some text */}
        <div className="container"> 
           <div className="left">
             <h1>Find the freelancing Service</h1>
             <div className="search">
                <div className="searchInput">
                    <img src="./img/search.png" alt=""/>
                    <input type="text" placeholder='Try" bulding app"'/>
                </div>
                <button>Search</button>
             </div>
              <div className="popular">
                <span>Popular:</span>
                <button>Web Design</button>
                <button>Wordpress</button>
                <button>Programming</button>
                <button>UI/UX Design</button>
              </div>
           </div>
           <div className="right">
             
           </div>

        </div>
    </div>
    )



}
export default Featured;
