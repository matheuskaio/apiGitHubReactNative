import React, { Component } from "react";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Container from "../../components/Container/index";
import { Form, SubmitButton, List } from "./styles";

class Main extends Component {
  state = {
    novoRepositorio: "",
    repositorios: [],
    loading: false
  };
  // Carrega os dados do localstorage
  componentDidMount() {
    const repositorios = localStorage.getItem("repositorios");
    if (repositorios) {
      this.setState({ repositorios: JSON.parse(repositorios) });
    }
  }

  // Salva os dados no localstorage
  // no primeiro paramentro são as propriedades por isso o _ já que não vou alterar as propriedades
  componentDidUpdate(_, estadoAnterior) {
    const { repositorios } = this.state;
    if (estadoAnterior.repositorios !== repositorios) {
      localStorage.setItem("repositorios", JSON.stringify(repositorios));
    }
  }
  dadosEntrada = e => {
    this.setState({ novoRepositorio: e.target.value });
  };
  dadosSubmissao = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { novoRepositorio, repositorios } = this.state;
    const response = await api.get(`/repos/${novoRepositorio}`);
    const data = {
      nome: response.data.full_name
    };
    this.setState({
      // Faça a cópia de tudo que já tem em repositorio com ...repositorio e coloco
      // a nova informação
      // usando conceito de multabilidade, sempre criando um novo vetor
      repositorios: [...repositorios, data],
      novoRepositorio: "",
      loading: false
    });
    // console.log(this.state.novoRepositorio);
    // console.log(response.data);
  };
  render() {
    const { novoRepositorio, loading, repositorios } = this.state;
    return (
      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>
        <Form onSubmit={this.dadosSubmissao}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={novoRepositorio}
            onChange={this.dadosEntrada}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositorios.map(repositorio => (
            <li key={repositorio.nome}>
              <span>{repositorio.nome}</span>
              <Link to={`/repositorio/${encodeURIComponent(repositorio.nome)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
