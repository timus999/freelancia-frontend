// src/components/wCard/WCard.jsx
// import React from 'react';
// import './WCard.scss';

// const WCard = ({ item }) => {
//   return (
//     <div className="wCard">
//       <img src={item.img} alt="" />
//       <div className="info">
//         <div className="texts">
//           <h2>{item.title}</h2>
//           <span>{item.desc}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WCard;





//dup 
// src/components/wCard/WCard.jsx
import React from 'react';
import './WCard.scss';

const WCard = ({ item }) => {
  // Use a classNames array to build the class string
  const cardClasses = ['wCard'];
  if (item.isTall) {
    cardClasses.push('tall');
  }
  if (item.isWide) {
    cardClasses.push('wide');
  }
  return (
    <div className={cardClasses.join(' ')}> {/* Join the array into a single string */}
      <img src={item.img} alt="" />
      <div className="info">
        <div className="texts">
          <h2>{item.title}</h2>
          <span>{item.desc}</span>
        </div>
      </div>
    </div>
  );
};

export default WCard;