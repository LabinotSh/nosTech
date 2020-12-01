import React from 'react'
import './Checkout.css'

const Checkout = () => {
    const color = "black"
    return (
        <div className=" okej">
            <div className="card orderSummary">
                <div className="checkout-l">
                    <div className="checkoutTabs">
                        <ul>
                            <li style={{color: color}}>01 Customer Info</li>
                            <li>02 Payment Info</li>
                        </ul>
                    </div>
                    <div className="customerInfo mt-5">
                        <h5>Customer Information</h5>
                        <form className="checkoutAddressForm">
                            <div className="d-flex w-100">
                                <div className="l-Input">
                                    <label htmlFor="name">FIRST NAME</label>
                                    <br></br>
                                    <input type="text" id="name"></input>
                                </div>
                                <div className="r-Input">
                                    <label htmlFor="lastname">LAST NAME</label>
                                    <br></br>
                                    <input type="text" id="lastname"></input>
                                </div>
                            </div>
                            <label htmlFor="address">ADDRESS</label>
                            <br></br>
                            <input style={{width:"79%"}} className="addressInput" type="text" id="address"></input>
                            <div className="d-flex w-100">
                                <div className="l-Input">
                                    <label htmlFor="country">COUNTRY</label>
                                    <br></br>
                                    <input type="text" id="country"></input>
                                </div>
                                <div className="r-Input">
                                    <label htmlFor="city">CITY</label>
                                    <br></br>
                                    <input type="text" id="city"></input>
                                </div>
                            </div>
                            <div className="d-flex w-100">
                                <div className="l-Input">
                                    <label htmlFor="zipcode">ZIP CODE</label>
                                    <br></br>
                                    <input type="text" id="zipcode"></input>
                                </div>
                                <div className="r-Input">
                                    <label htmlFor="phone">PHONE NUMBER</label>
                                    <br></br>
                                    <input type="text" id="phone"></input>
                                </div>
                            </div>
                            <button type="submit">Go to payment info</button>
                        </form>
                    </div>
                </div>
                <div className="checkout-r">
                    <h5>Course Information</h5>
                    <hr></hr>
                    <div className="checkoutImageDiv">
                        <img src={`/uploads/nosTech-1606242040509.png`}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
