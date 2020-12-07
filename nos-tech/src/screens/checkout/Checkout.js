import React, {useState, useEffect} from 'react'
import './Checkout.css'
import {useDispatch, useSelector} from 'react-redux'
import {listCourseDetails,addStudentToCourse} from '../../redux/actions/courseActions'
import {addCourseToStudent} from '../../redux/actions/userActions'
import jwt_decode from 'jwt-decode';
import { history } from "../../helpers/history";
import axios from 'axios'


const Checkout = ({match}) => {
    const color = "black"
    const courseId = match.params.id;
    const [user,setUser] = useState({})
    const[discount, setDiscount] = useState(0);
    const[couponId, setCouponId] = useState("");
    const[error, setError] = useState();
    const[success,setSuccess] = useState();
    
    

    const dispatch = useDispatch();
    const courseDetails = useSelector(state => state.courseDetails)
    const{course} = courseDetails
    const courseAddStudent = useSelector(state => state.courseAddStudent)
    const {success:addStudentSuccess} = courseAddStudent

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(addStudentToCourse(courseId,user))
        dispatch(addCourseToStudent(user._id,course))
        try {
        if(success) {
            await axios.put(`/api/coupon/${couponId}`)
        }
        }catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if(addStudentSuccess) {
            history.push(`/course/${course._id}`)
        }
        dispatch(listCourseDetails(courseId))

        
    }, [dispatch,courseId,addStudentSuccess])

    useEffect(() => {
        try {
            const token = localStorage.getItem('user')
            if(token) {
                const useri = jwt_decode(token)       
                setUser(useri)
                if(course.users) {
                    if(course.users.find(u => u.toString() === user._id.toString())) {
                        history.push(`/course/${course._id}`)
                    } 
                }
            }
        }catch(e) {
            console.log(e)
        }
    },[course])
    
   const couponSubmitHandler = async (e) =>  {
       e.preventDefault();

       try { 
         const {data} = await axios.get(`/api/coupon/${couponId}`)
         if(data.hasExpired) {
             setSuccess();
             setError("Coupon has expired!!")
         }else {
             const disc = data.value/100 * course.price
             setDiscount(disc.toFixed(2))
             setError()
             setSuccess("Coupon successfully added!")
             setCouponId("")
         }

       }catch(e) {
           setSuccess();
           setError("Invalid coupon!")
       }
   }
    
    console.log(couponId)
    
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
                        <form className="checkoutAddressForm" onSubmit={(e) => submitHandler(e)}>
                            <div className="d-flex w-100">
                                <div className="l-Input">
                                    <label htmlFor="name">FIRST NAME</label>
                                    <br></br>
                                    <input type="text" id="name" disabled></input>
                                </div>
                                <div className="r-Input">
                                    <label htmlFor="lastname">LAST NAME</label>
                                    <br></br>
                                    <input type="text" id="lastname"disabled></input>
                                </div>
                            </div>
                            <label htmlFor="address">ADDRESS</label>
                            <br></br>
                            <input style={{width:"79%"}} className="addressInput" type="text" id="address"disabled></input>
                            <div className="d-flex w-100">
                                <div className="l-Input">
                                    <label htmlFor="country">COUNTRY</label>
                                    <br></br>
                                    <input type="text" id="country"disabled></input>
                                </div>
                                <div className="r-Input">
                                    <label htmlFor="city">CITY</label>
                                    <br></br>
                                    <input type="text" id="city"disabled></input>
                                </div>
                            </div>
                            <div className="d-flex w-100">
                                <div className="l-Input">
                                    <label htmlFor="zipcode">ZIP CODE</label>
                                    <br></br>
                                    <input type="text" id="zipcode"disabled></input>
                                </div>
                                <div className="r-Input">
                                    <label htmlFor="phone">PHONE NUMBER</label>
                                    <br></br>
                                    <input type="text" id="phone"disabled></input>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-5 checkoutButtonDiv">
                                <button type="submit">Enroll Now</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="checkout-r">
                    <h5>Course Information</h5>
                    <hr></hr>
                    <div className="checkoutCourse d-flex w-100">   
                        <div className="checkoutImageDiv w-50">
                            <img src={`/${course.image}`}></img>
                        </div>
                        <div className="checkoutCourseDetails w-50 d-flex flex-column justify-content-between ml-3">
                            <p>{course.name}</p>
                            <p>${course.price}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-between mt-3">
                        <p>Subtotal</p>
                        <p>${course.price}</p>
                    </div>  
                    <div className="d-flex justify-content-between ">
                        <p>Discount</p>
                        <p>${discount}</p>
                    </div>
                    <hr></hr>
                    <form className="couponForm" onSubmit={(e)=>couponSubmitHandler(e)}>
                        <label htmlFor="coupon">Have a coupon?</label>
                        <br></br>
                        {error?<p className="text-danger">{error}</p>:success?<p className="text-success">{success}</p>:null}
                        <input type="text" value={couponId} onChange={(e) => {setCouponId(e.target.value)}}></input>
                        
                        <button type="submit">Apply</button>
                    </form>
                    <hr></hr>
                    <div className="d-flex justify-content-between ">
                        <h5>Total</h5>
                        <h5>${course.price - discount}</h5>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default Checkout
