import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import axios from "axios";

const baseURL = "https://mvsistemas-coffe.herokuapp.com/api/usuarios"
class Home extends React.Component{


    state = {
        nome: '',
        cpf: '',
        cafe: '',
        listagem: [],
        lancamentoDeletar: {},
        mensagemErro: null,
        lancamentos: [],
        id:[]
    }

    inserir = () =>{
        axios.post('https://mvsistemas-coffe.herokuapp.com/api/usuarios', {
            nome: this.state.nome,
            cpf: this.state.cpf,
            cafe: this.state.cafe
        }).then( response => {
            alert('Café cadastrado com sucesso!')
            window.location.reload()
        }).catch(erro => {
            alert('CPF Inválido ou já cadastrado e/ou Café já cadastrado.')
        })
    }
    
    componentDidMount(){
        axios.get('https://mvsistemas-coffe.herokuapp.com/api/usuarios')
        .then(response => {
            const lista = response.data;
            this.setState({listagem: lista})
        }).catch(erro =>{
            console.log(erro.response)
        })
    }
    
   deletar(id){
    return axios.delete(baseURL + '/' + id).then(            window.location.reload())
    
}

    render(){


        return(
            <Card title="Café da manhã na Mv!">
            <div className="row">
              <div className="col-md-12">
                <div className="bs-component">
                    <FormGroup htmlFor="InputAno" label="Digite seu nome completo:">
                        <input type = "text" className="form-control" id="inputNome"
                        name="nome"
                        placeholder="Digite seu nome"
                        onChange={e => this.setState({nome: e.target.value})} />
                    </FormGroup>
                    <br/>
                    <FormGroup htmlFor="InputCpf" label="Digite seu CPF:">
                        <input type = "text" className="form-control" id="inputCpf"
                        name="cpf"
                        placeholder="00000000000" 
                        onChange={e => this.setState({cpf: e.target.value})}/>
                    </FormGroup>
                    <br/>
                    <FormGroup htmlFor="InputAno" label="Digite o café da manhã que você deseja levar:">
                        <input type = "text" className="form-control" id="inputCafe"
                        aria-describedy="emailHelp"
                        placeholder="Digite seu café" 
                        onChange={e => this.setState({cafe: e.target.value})}/>
                    </FormGroup>
                    <br/>
                    <button onClick={this.inserir} type="button" className="btn btn-success"><i className="pi pi-save"></i>Inserir café da manhã</button>
                    </div>
                        </div>
                          </div>
                          <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs component">
                                <table className="table table-hover">
            <thead>
                <tr>
                      <th scope="col">Colaborador</th>
                      <th scope="col">CPF</th>
                      <th scope="col">Café da manhã</th>
                      <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.listagem.map(
                        usuario =>
                        <tr>
                            <td>{usuario.nome}</td>
                            <td>{usuario.cpf}</td>
                            <td>{usuario.cafe}</td>
                            <td>
                            <button type="button" onClick={() => this.deletar(usuario.id)} class="btn btn-danger">Deletar</button></td>
                            </tr>
                    )
                }
            </tbody>
        </table>
                                </div>
                                </div>
                        </div>

                          </Card>
                          

        )
    }
}

export default Home