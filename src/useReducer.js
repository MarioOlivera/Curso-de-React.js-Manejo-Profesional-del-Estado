import React from 'react'

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const actionTypes = {
    CONFIRM: 'CONFIRM',
    ERROR: 'ERROR',
    WRITE: 'WRITE',
    CHECK: 'CHECK',
    DELETE: 'DELETE',
    RESET: 'RESET',
}

const reducer = (state, action) => {

    switch(action.type)
    {
        case actionTypes.CONFIRM:
            return {
                ...state,
                error: false,
                loading: false,
                confirmed: true
            }

        case actionTypes.ERROR:
            return {
                ...state,
                error: true,
                loading: false
            }
        
        case actionTypes.WRITE:
        
            return {
                ...state,
                value: action.payload
            }
        
        case actionTypes.CHECK:
        
            return {
                ...state,
                loading: true
            }
        
        case actionTypes.DELETE:
        
            return {
                ...state,
                deleted: true,
                confirmed: false
            }
        
        
        case actionTypes.RESET:
        
            return {
                ...state,
                deleted: false,
                confirmed: false,
                value: ''
            }

        default:
            return state
    }
} 

const SECURITY_CODE = 'paradigma'

function UseReducer({name}){

    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirm = () => {
        dispatch({type: actionTypes.CONFIRM})
    }

    const onError = () => {
        dispatch({type: actionTypes.ERROR})
    }

    const onWrite = (value) => {
        dispatch({type: actionTypes.WRITE, payload: value})
    }

    const onCheck = () => {
        dispatch({type: actionTypes.CHECK})
    }

    const onDelete = () => {
        dispatch({type: actionTypes.DELETE})
    }

    const onReset = () => {
        dispatch({type: actionTypes.RESET})
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
                    onChange={(event) => {
                        onWrite(event.target.value)
                    }}></input>
                <button
                    onClick={onCheck}
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
                <button onClick={onDelete}>
                    Si, eliminar
                </button>
                <button onClick={onReset}>
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
                <button onClick={onReset}>
                    Resetear, volver atras
                </button>
            </React.Fragment>
        )
    }
}

export {UseReducer}