const Toast = ({message}) => {
    return(
        !message ? null :
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    )
}

export default Toast