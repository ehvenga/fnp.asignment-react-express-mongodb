import { useState } from 'react'
import InputField from '../../components/InputField'
import Toast from '../../components/Toast'
import * as yup from 'yup'
import { axios, PATHS } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../utils/auth'
import authAction from '../../redux/actions/authAction'
import { Redirect } from 'react-router-dom'

let schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(4)
})

const Signin = ({history}) => {

    const isLoggedIn = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        setMessage("")
        schema.validate({email, password}, { abortEarly: false })
        .then(data => {
            console.log(data)
            axios({
                method: 'post',
                url: 'signin',
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
            console.log(err.errors)
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
                <Toast message={message}  />
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
                <button className="col-3 btn btn-primary mt-3" type="submit">Login</button>
            </div>
        </form>
    )
}

export default Signin