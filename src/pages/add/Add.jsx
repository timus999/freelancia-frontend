import React from 'react';
import "./Add.scss"

const Add = () =>{
    return (
        <div className='add'>
            <div className="container">
                <h1>Add New Gig</h1>
                <div className="sections">
                    <div className="left">
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="Eg. I am very bad at nepali language"/>
                        <label htmlFor="">Catogery</label>
                        <select name="cats" id="cats">
                            <option value="graphics">Graphics Design</option>
                            <option value="web">Web Development</option>
                            <option value="animation">Animation</option>
                            <option value="ui/ux">UI/UX</option>
                        </select>
                         <label htmlFor="">Color Image</label>
                         <input type="file"   />
                         <label htmlFor="">Upload</label>
                         {/* we will be able to upload multiple images */}
                         <input type="file" multiple  />  
                         <label htmlFor="">Cover Image</label>
                         <label htmlFor="">Description</label>
                         <textarea name="" id="" cols="30" rows="10" placeholder="Brief Description"></textarea>
                         <button>Create</button>
                    </div>
                    <div className="right">
                        <label htmlFor="">Service Title</label>
                        <input type="" placeholder="Example : One page design"/>
                        <label htmlFor="">Short Description</label>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Brief Description"></textarea>
                        <label htmlFor="">Delivery time(example: 3days)</label>
                        <input type="number" min={1}/>
                        <label htmlFor="">Revision Number</label>
                        <input type="number" min={1}/>
                        <label htmlFor="">Add Features</label>
                        <input type="text" placeholder="eg page design"/>
                        <input type="text" placeholder="eg file uploading"/>
                        <input type="text" placeholder="eg setting a domain"/>
                        <input type="text" placeholder="eg hosting"/>
                        <label htmlFor="">Price</label>
                        <input type="number" min={1}/>
                    </div>
                </div>
            </div> 
        </div>
    )
}
export default Add;