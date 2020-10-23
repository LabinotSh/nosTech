import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <div className="footeri">
            <div className="row">

                <div className="container-1">
                    <div className="col-2">
                        <div className="resources">
                            <h1>Resources</h1>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                        </div>
                    </div>

                    <div className="vl"></div>

                    <div className="col-2">
                        <div className="services">
                            <h1>Services</h1>
                            <ul>
                                <li> Courses</li>
                                <li> Private lessons</li>
                                <li> Tutorials</li>
                                <li> Online community</li>
                            </ul>
                        </div>
                    </div>

                    <div className="vl"></div>

                    <div className="col-2">
                        <div className="contact">
                            <h1>Get in Touch</h1>
                            <ul>
                                <li>nosTech.edu</li>
                                <li>nostech@gmail.com</li>
                                <li>04923^23\|/</li>
                            </ul>
                        </div>
                    </div>

                    <div className="vl"></div>

                    <div className="col-6">
                        <div className="subscription">
                            <p><b>Subscribe</b> to stay up to date with the latest from nosTech:</p>

                            <form>
                                <input type="text" placeholder="Your email here..."></input>
                            </form>
                            <div className="submit">
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
        </div>


    )
}

export default Footer
