import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import background from '../images/pexels-fauxels-3183183.jpg'

const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const RegisterForm = ({setUserId}) => {

  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    console.log(result);
    console.log(firstName);
    setValidFirstName(result);
  }, [firstName])

  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    console.log(result);
    console.log(lastName);
    setValidLastName(result);
  }, [lastName])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg("");

  }, [firstName, lastName, email, pwd, matchPwd])

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/users/register', {

      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pwd,
      confirmPassword: matchPwd
    }, { withCredentials: true })

      .then((res) => {
        console.log(res.data);

        if (res.data.code === 11000) {
          // Duplicate key error, email already exists
          const errorMessage = 'Email already exists. Please use a different email address.';
          // Display the error message to the user
          alert(errorMessage);
        } else {

          const userId = res.data.user._id;
          setUserId = userId
          setPwd("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setMatchPwd("");
          setSuccess(true);

          //   setLoggedIn(true);
          navigate("/projects");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          setErrMsg(err.response.data.error);
        }
      })
  }


  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
      <div className='row'>
        <div className='w-100'>
          <div className="card p-5" style={{ backgroundColor: 'white', border: '2px solid black', borderRadius: '10px', width: '500px', margin: '0auto' }}>
            <p ref={errRef} className={errMsg ? "errmsg" : "d-none"} aria-live="assertive"> {errMsg}</p>
            <h1 className='text-center mb-5'>Project Manager</h1>
            <h3 className="col-6 offset-3 row" >Register:</h3>
            <form className="col-6 offset-3 row my-3" onSubmit={handleSubmit}>
              <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions text-danger" : "d-none"}>
                Must begin with a letter.<br />
                Letters, hyphens, commas or apostrophes allowed.
              </p>

              <label htmlFor="firstname"> First Name:</label>
              <input
                type="text"
                ref={userRef}
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />

              <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions text-danger" : "d-none"}>
                Must begin with a letter.<br />
                Letters, hyphens, commas or apostrophes allowed.
              </p>

              <label htmlFor="lastname"> Last Name:</label>
              <input
                type="text"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />

              <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions text-danger" : "d-none"}>
                Must be a valid Email
              </p>

              <label htmlFor="email"> Email:</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />

              <p id="pwdmsg" className={pwdFocus && !validPwd ? "instructions text-danger" : "d-none"}>

                8 to 24 characters <br />
                Must include uppercase and lowercase letters, a number and a special character<br />
                Allowed special Characters: !@#$%
              </p>

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdmsg"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />

              <p id="confirm" className={matchFocus && !validMatch ? "instructions text-danger" : "d-none"}>
                Must match the first password
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                arie-describedby="confirm"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />

              <button disabled={!validFirstName || !validLastName || !validEmail || !validPwd || !validMatch ? true : false} className="mt-4"> Sign Up</button>
            </form>
            <p className="mt-3 col-6 offset-3 row"> <span>Already registered?  </span>
              <span className="ml-2 "><Link to="/signin">Sign In</Link></span>
            </p>


          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm