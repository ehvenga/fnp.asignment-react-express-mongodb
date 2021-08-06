const InputField = ({fieldId, label, name, type, value, setValue}) => {
    return(
        <div className="input-item">
            <label htmlFor={fieldId} className="form-label">{label}</label>
            <input
                name={name}
                type={type}
                className="form-control"
                id={fieldId}
                value={value}
                onChange={(e)=> setValue(e.target.value)}
            />
        </div>
    )
}

export default InputField