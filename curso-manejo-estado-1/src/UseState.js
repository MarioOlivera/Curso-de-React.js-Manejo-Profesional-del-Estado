import React from 'react'

const SECURITY_CODE = 'paradigma'

function UseState({name}){

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    })

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onWrite = (value) => {
        setState({
            ...state,
            value: value
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
            confirmed: false
        })
    }

    const onReset = () => {
        setState({
            ...state,
            deleted: false,
            confirmed: false,
            value: ''
        })
    }

    React.useEffect(() => {

        setTimeout(() => {
            
            if(state.loading)
            {
                if(state.value === SECURITY_CODE)
                { 
                   onConfirm()
                }
                else
                {
                    onError()
                }
            }
        },2000)
    },[state.loading])

    if(state.deleted === false && state.confirmed === false)
    {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el codigo de seguridad para comprobar que quieres eliminar.</p>
                
                {state.error && !state.loading && (
                    <p>El código es incorrecto</p>
                )}
                
                {state.loading && (
                    <p>Cargando ...</p>
                )}

                <input 
                    placeholder='Código de seguridad' 
                    value={state.value} 
                    onChange={(event) => onWrite(event.target.value)}></input>
                <button
                    onClick={() => { onCheck() }}
                >
                    Comprobar
                </button>  
            </div>
        )
    }
    else if(state.confirmed === true && state.deleted === false)
    {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Estas seguro?</p>
                <button onClick={() => onDelete()}>
                    Si, eliminar
                </button>
                <button onClick={() => onReset()}>
                    No, me arrepenti
                </button>
            </React.Fragment>
        )
    }
    else
    {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button onClick={() => onReset()}>
                    Resetear, volver atras
                </button>
            </React.Fragment>
        )
    }
}

export {UseState}