import InputField from '../../components/InputField'
import { useState } from 'react'
import * as yup from 'yup'
import Toast from '../../components/Toast'
import { axios, PATHS } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import authAction from '../../redux/actions/authAction'
import { setAuth } from '../../utils/auth' 
import { Redirect } from 'react-router-dom'

let schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(4)
})

const Signup = ({history}) => {

    const isLoggedIn = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        setMessage("")
        schema.validate({name, email, password}, { abortEarly: false })
        .then(data => {
            console.log(data)
            axios({
                method: 'post',
                url: 'signup',
                data
            })
            .then(res => {
                console.log(res)
                if(!!res.data.token) {
                    dispatch(authAction.login())
                    setAuth(res.data.token)
                    history.push(PATHS.PROFILE)
                }
            })
            .catch(err => {
                setMessage(err.response.data.message)
                setTimeout(() => {
                    setMessage("")
                }, 4000)
            })
        })
        .catch(err => {
            setMessage(err.errors[0])
            setTimeout(() => {
                setMessage("")
            }, 4000)
        })
    }

    if (isLoggedIn) {
        return <Redirect to={PATHS.PROFILE} />
    }

    return(
        <form className="container col-11 col-md-6" onSubmit={submitHandler}>
            <div className="card">
                <Toast message={message} />
                <InputField 
                    fieldId="inputName"
                    setValue={setName}
                    name="name"
                    label="Name"
                    type="text"
                />
                <InputField 
                    fieldId="inputEmail"
                    setValue={setEmail}
                    name="email"
                    label="Email"
                    type="text"
                />
                <InputField 
                    fieldId="inputPassword"
                    setValue={setPassword}
                    name="password"
                    label="Password"
                    type="password"
                />
                <button className="col-3 btn btn-primary mt-3" type="submit">Create Account</button>
            </div>
        </form>
    )
}

export default Signup