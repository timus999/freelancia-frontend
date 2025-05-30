import React from 'react';
import "./Message.scss"
import { Link } from 'react-router-dom';

const Message = () =>{
    return (
        <div className='message'>
            <div className='container'>
                <span className='breadcrumbs'>
                    <Link to='/messages'>MESSAGES</Link> > ABIN GAHATRAJ >
                </span>
                <div className='messages'>
                    <div className='item'>
                        <img src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' alt=''/>
                        <p>
                        Hi abin, i am Niharika Mishra. I am a software developer.
                        </p>
                    </div>
                    {/* creating 1more item */}
                     <div className='item owner'>
                        <img src='https://cdn.pixabay.com/photo/2023/11/22/14/14/oh-gerarman-8405610_1280.jpg' alt=''/>
                        <p>
                        I am Abin , But it does not matter who you are
                        </p>
                    </div>
                     <div className='item'>
                        <img src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' alt=''/>
                        <p>
                        But i just want to talk . I can build many web and mobile apps.
                        </p>
                    </div>
                    <div className='item owner'>
                        <img src='https://cdn.pixabay.com/photo/2023/11/22/14/14/oh-gerarman-8405610_1280.jpg' alt=''/>
                        <p>
                       Keep your mouth shut.
                        </p>
                    </div>
                    <div className='item owner'>
                        <img src='https://cdn.pixabay.com/photo/2023/11/22/14/14/oh-gerarman-8405610_1280.jpg' alt=''/>
                        <p>
                        It doesnot matter what you build.
                        </p>
                    </div>
                    <div className='item'>
                        <img src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' alt=''/>
                        <p>
                        I am unemployed and dont have any work. I need a job.😭
                        </p>
                    </div>
                    <div className='item owner'>
                        <img src='https://cdn.pixabay.com/photo/2023/11/22/14/14/oh-gerarman-8405610_1280.jpg' alt=''/>
                        <p>
                       Thats Great! Well Rest in Peace then.
                       Have a nice life.😘
                        </p>
                    </div>
                    
                </div>
                <hr/>
                <div className='write'>
                    <textarea name=''placeholder='write a message' id='1' cols={2} rows={3} ></textarea>
                    <button>SEND</button>
                </div>
            </div>
        </div>
    )
}
export default Message;


