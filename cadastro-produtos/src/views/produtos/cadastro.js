import React from 'react';
import ProdutoService from '../../app/produtoService';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
}

class CadastroProduto extends React.Component {

    state = estadoInicial;

    constructor() {
        super();

        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        this.setState({ [nomeDoCampo]: valor });
    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }

        try {
            this.service.salvar(produto);
            this.limpaCampos();
            this.setState({ sucesso: true });
        } catch (erro) {
            const errors = erro.errors;
            this.setState({ errors: errors });
        }

    }

    limpaCampos = () => {
        this.setState(estadoInicial);
    }

    componentDidMount() {
        const sku = this.props.match.params.sku;

        if (sku) {
            const resultado = this.service.obterProdutos().filter(produto => produto.sku === sku);

            if (resultado.length === 1) {
                const produtoEncontrado = resultado[0];
                this.setState({ ...produtoEncontrado, atualizando: true });
            }
        }
    }

    render() {
        return (
            <Card header={this.state.atualizando ? 'Atualização de produto' : 'Cadastro de produto'}>

                {this.state.sucesso &&
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        Cadastro realizado comn <strong>Sucesso</strong>
                    </div>
                }

                {this.state.errors.length > 0 &&


                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Atenção!</strong><br />
                        {this.state.errors.map(msg => {
                            return (
                                <div><span>{msg}</span><br></br></div>
                            )
                        })}
                    </div>
                }

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-goup">
                            <label>Nome: *</label>
                            <input type="text" className="form-control" name="nome" onChange={this.onChange} value={this.state.nome}></input>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-goup">
                            <label>SKU: *</label>
                            <input type="text" disabled={this.state.atualizando} className="form-control" name="sku" onChange={this.onChange} value={this.state.sku}></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Descição:</label>
                            <textarea className="form-control" name="descricao" onChange={this.onChange} value={this.state.descricao} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-goup">
                            <label>Preço: *</label>
                            <input type="text" className="form-control" name="preco" onChange={this.onChange} value={this.state.preco}></input>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-goup">
                            <label>Fonecedor: *</label>
                            <input type="text" className="form-control" name="fornecedor" onChange={this.onChange} value={this.state.fornecedor}></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-success" onClick={this.onSubmit}>
                            {this.state.atualizando ? 'Atualizar' : 'Salvar'}
                        </button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary" onClick={this.limpaCampos}>Limpar</button>
                    </div>
                </div>
            </Card >
        )
    }
}

export default withRouter(CadastroProduto);