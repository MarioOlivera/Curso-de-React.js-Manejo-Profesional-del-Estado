import React from 'react'

const SECURITY_CODE = 'paradigma'

function UseState({name}){

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false
    })

    React.useEffect(() => {

        console.log("EMPEZANDO EL EFECTO")

        setTimeout(() => {
            
            if(state.loading)
            {
                if(state.value === SECURITY_CODE)
                { 
                    setState({
                        ...state,
                        error: false,
                        loading: false
                    })
                }
                else
                {
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    })
                }
            }
        },2000)

        console.log("TERMINANDO EL EFECTO")
    },[state.loading])

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
                onChange={(event) => setState({
                    ...state,
                    value: event.target.value
                })}></input>
            <button
                onClick={() => {
                    setState({
                        ...state,
                        loading: true
                    })
                }}
            >
                Comprobar
            </button>  
        </div>
    )
}

export {UseState}