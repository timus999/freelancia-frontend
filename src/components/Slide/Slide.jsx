import React, { Children } from "react";
import "./Slide.scss"
import Slider from 'infinite-react-carousel';
import CatCard from "../catCard/CatCard";
import { cards } from "../../data";

const Slide =({children,slidesToShow,autoplay}) =>{
    return(
        <div className="slide">
            <div className="container">
               <Slider slidesToShow={slidesToShow} autoplay={autoplay}>
          {children}
          {/* {cards.map (card=>(
            <CatCard item={card} key={card.id}/>
          ))}  kate xa ekxin lai*/}
  </Slider> 
            </div>
        </div>
    )
}
export default Slide;