import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Toast } from "react-toastify"


function Register() {
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        Address: "",
        description: ""
    })
    const navigate = useNavigate()

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        const { name, email, work,  Address, mobile, description, age } = inpval;

        if (name === "") {
            toast.error("name is required")
        } else if (email === "") {
            toast.error("email is required")
        } else if (!email.includes("@")) {
            toast.error("enter valid email")
        } else if (work === "") {
            toast.error("work is required")
        } else if ( Address === "") {
            toast.error("add is required")
        } else if (mobile === "") {
            toast.error("mobile is required")
        } else if (age === "") {
            toast.error("age is required")
        }else{
            fetch("http://localhost:8002/insert-data-user",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({
                    name, email, work, Address, mobile, description, age
                })
              }).then((res)=>{
               
                 toast.success('Employee Registered successfully.')
                 navigate('/');
              }).catch((err)=>{
                console.log(err.message)
              })
        }
    }

  return (
    <div className="container">
       <div className="divbtn mt-2 mb-2">
                        <Link to="/" className="btn btn-success">Go to Home</Link>
                    </div>
            
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">age</label>
                        <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inpval.Address} onChange={setdata} name="Address" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="description" value={inpval.description} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={handlesubmit}  class="btn btn-primary">Submit</button>
                    
                </div>
            </form>
        </div>
  )
}

export default Register