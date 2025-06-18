import React from 'react';
import "./Messages.scss";
import { Link } from 'react-router-dom';

const Messages = () =>{

 const currentUser={
    id:1,
    username: "Ariana",
    isFreelancer: true, 
};

const message = `hi my name is abin gahatraj and i am a UI/UX designer.`
    return (
        <div className="messages">
            <div className="container">
                <div className="title">
                    <h1>Messages</h1>
                </div>
                <table>
                    <tr>
                        <th> Buyer</th>
                        <th>Last Message</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    <tr className="active">
                        <td>Abin Gahatraj</td>
                        <td><Link to="/message/123" className='link'>{message.substring(0,100)}...</Link></td>
                        <td>1 day ago</td>
                        <td>
                         <button>Mark as Read</button>
                        </td>
                    </tr>
                    <tr className="active">
                        <td>Thakur Kunwar</td>
                        <td><Link to="/message/123" className='link'>{message.substring(0,100)}...</Link></td>
                        <td>1 day ago</td>
                        <td>
                         <button>Mark as Read</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Monster Sumit</td>
                        <td><Link to="/message/123" className='link'>{message.substring(0,100)}...</Link></td>
                        <td>1 day ago</td>
                    </tr>
                    <tr>
                        <td>Niharika</td>
                        <td><Link to="/message/123" className='link'>{message.substring(0,100)}...</Link></td>
                        <td>1 day ago</td>
                    </tr>
                    <tr>
                        <td>Abin Gahatraj</td>
                        <td><Link to="/message/123" className='link'>{message.substring(0,100)}...</Link></td>
                        <td>1 day ago</td>
                    </tr>
                    <tr>
                        <td>Abin Gahatraj</td>
                        <td><Link to="/message/123" className='link'>{message.substring(0,100)}...</Link></td>
                        <td>1 day ago</td>
                    </tr>
                </table>

            </div>
        </div>
    )
}
export default Messages;