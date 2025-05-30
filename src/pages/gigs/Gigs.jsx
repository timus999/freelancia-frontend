import React, { useState } from 'react';
import "./Gigs.scss"
import GigCard from '../../components/gigCard/GigCard';
import {gigs} from '../../data';

const Gigs = () =>{
    const [sort, setSort] = useState("sales"); 
    const [open, setOpen] = useState(false); //this makes dowm button

const reSort = (type) =>{ //taking type from user
    setSort(type); // setting state
    setOpen(false); //close menu when we click one of them
}

    return (
        <div className="gigs">
          <div className="container">
              <span className='breadcrumbs'> FREELANCIA  GRAPHICS & DESIGN </span>
              <h1>GRAPHICS DESIGNER</h1>
              <p>
                Shaping perceptions, one pixel at a time. Freelancia Graphic Designer
              </p>
              <div className='menu'>
                 <div className='left'>
                    <span>Budget</span>
                    <input type="text" placeholder="min"/>
                    <input type="text" placeholder="max"/>
                    <button>Apply</button>
                 </div>
                 <div className="right">
                    <span className="sortBy">SortBy</span>
                     <span className="sortType">
                     {sort === "sales" ? "Best Selling" : "Newest"}
                     </span>
                     <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
                {open && (
                   <div className="rightMenu">
                     {sort === "sales" ? (
                       <span onClick={()=>reSort("createdAt")}>Newest</span>
                       ) : (
                       <span onClick={()=>reSort("sales")}>Best Selling</span>
                       )}
                     </div>
                     )}
                 </div>
              </div>
              <div className="cards">
                {gigs.map(gig=>(
                  <GigCard key={gig.id} item={gig}/>
                ))}
              </div>
          </div>
        </div>
    )
}
export default Gigs;