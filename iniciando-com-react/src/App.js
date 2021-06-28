import React from "react";
import './index.css'

class App extends React.Component {

  state = {
    nome: ''
  }

  modificarNome = (event) => {
    let nome = event.target.value;
    this.setState({
      nome: nome
    })
  }

  criaComboBox = () => {
    const opcoes = ["Fulano", "Cicrano", "Beltrano"]
    const comboBoxOptions = opcoes.map(opcao => <option>{opcao}</option>)

    return (
      <select>
        {comboBoxOptions}
      </select>
    )
  }

  componentDidMount() {
    console.log("Executou o componentDidMount");
  }

  render() {
    const MeuComboBox = () => this.criaComboBox();

    return (
      <>
        <input type="text" className="texto-centralizado" value={this.state.nome} onChange={this.modificarNome} />
        <h1>Hello {this.state.nome} e tome uma prop {this.props.nome} idade {this.props.idade}</h1>
        <MeuComboBox></MeuComboBox>
      </>

    )
  }
}

export default App;