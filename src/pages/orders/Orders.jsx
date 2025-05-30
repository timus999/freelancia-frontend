import React from 'react';
import "./Orders.scss"
import { Link } from 'react-router-dom';

const Orders = () =>{

 const currentUser={
    id:1,
    username: "Ariana",
    isSeller: true, 
};
    return (
        <div className='orders'>
            <div className='container'>
                <div className='title'>
                    <h1>ORDERS</h1>
                </div>
                <table>
                    <tr>
                        <th> Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
                        <th>Contact</th>
                    </tr>
                    <tr>
                        <td>
                          <img  className='img' src='https://i.pinimg.com/1200x/09/fc/92/09fc921d903cd21342cf640b60187f30.jpg' alt=''/>
                        </td>
                        <td>Gig1</td>
                        <td>100</td>
                        <td>123</td>
                        <td>
                            <img className='message' src='/img/message.png' alt=''/>
                        </td>
                    </tr>
                     <tr>
                        <td>
                          <img  className='img' src='https://i.pinimg.com/1200x/09/fc/92/09fc921d903cd21342cf640b60187f30.jpg' alt=''/>
                        </td>
                        <td>Gig2</td>
                        <td>178</td>
                        <td>100</td>
                        <td>
                            <img className='message' src='/img/message.png' alt=''/>
                        </td>
                    </tr>
                     <tr>
                        <td>
                          <img  className='img' src='https://i.pinimg.com/1200x/09/fc/92/09fc921d903cd21342cf640b60187f30.jpg' alt=''/>
                        </td>
                        <td>Gig3</td>
                        <td>1000</td>
                        <td>13</td>
                        <td>
                            <img className='message' src='/img/message.png' alt=''/>
                        </td>
                    </tr>
                     <tr>
                        <td>
                          <img  className='img' src='https://i.pinimg.com/1200x/09/fc/92/09fc921d903cd21342cf640b60187f30.jpg' alt=''/>
                        </td>
                        <td>Gig4</td>
                        <td>300</td>
                        <td>134</td>
                        <td>
                            <img className='message' src='/img/message.png' alt=''/>
                        </td>
                    </tr>
                     <tr>
                        <td>
                          <img  className='img' src='https://i.pinimg.com/1200x/09/fc/92/09fc921d903cd21342cf640b60187f30.jpg' alt=''/>
                        </td>
                        <td>Gig5</td>
                        <td>1566</td>
                        <td>1000</td>
                        <td>
                            <img className='message' src='/img/message.png' alt=''/>
                        </td>
                    </tr>
                     <tr>
                        <td>
                          <img  className='img' src='https://i.pinimg.com/1200x/09/fc/92/09fc921d903cd21342cf640b60187f30.jpg' alt=''/>
                        </td>
                        <td>Gig6</td>
                        <td>100</td>
                        <td>123</td>
                        <td>
                            <img className='message' src='/img/message.png' alt=''/>
                        </td>
                    </tr>
                </table>

            </div>
        </div>
    )
}
export default Orders;