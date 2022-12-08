import React from 'react'
import {Loading} from './Loading'

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component
{
    constructor(props){
        super(props)

        this.state = {
            value: '',
            error: false,
            loading: false
        }
    }

    componentDidMount(){
        console.log("componentDidMount")
    }

    componentDidUpdate()
    {
        console.log("actualizacion")

        if(this.state.loading)
        {
            setTimeout(() => {
              
                if(this.state.value === SECURITY_CODE)
                { 
                    this.setState({error: false, loading: false})
                }
                else
                {
                    this.setState({error: true, loading: false})
                }
                
            }, 2000)
        }
    }

    render()
    {
        const {name} = this.props

        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el codigo de seguridad para comprobar que quieres eliminar.</p>
                
                {this.state.error && !this.state.loading && (
                    <p>El código es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading></Loading>
                )}

                <input 
                    placeholder='Código de seguridad'
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({value: event.target.value})
                    }}
                ></input>
                <button onClick={() => this.setState({loading: true})}>Comprobar</button>  
            </div>
        )
    }
}

export {ClassState}