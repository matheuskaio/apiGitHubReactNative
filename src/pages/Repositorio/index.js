import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../services/api";

import { Loading, Proprietario, ListaIssues } from "./styles";
import Container from "../../components/Container";

class Repositorio extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repositorio: PropTypes.string
      })
    }).isRequired
  };
  state = {
    repositorio: {},
    issues: [],
    loading: true
  };
  async componentDidMount() {
    const { match } = this.props;
    const nomeRepositorio = decodeURIComponent(match.params.repositorio);

    const [repositorio, issues] = await Promise.all([
      api.get(`/repos/${nomeRepositorio}`),
      api.get(`/repos/${nomeRepositorio}/issues`, {
        params: {
          state: "open",
          per_page: 4
        }
      })
    ]);
    console.log(repositorio);
    console.log(issues);
    this.setState({
      repositorio: repositorio.data,
      issues: issues.data,
      loading: false
    });
  }
  render() {
    // O RENDER PARA NO PRIMEIRO RETURN
    const { repositorio, issues, loading } = this.state;
    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      // LINK POR ULTIMO
      <Container>
        <Proprietario>
          <Link to={"/"}>Voltar aos Repositórios</Link>
          <img
            src={repositorio.owner.avatar_url}
            alt={repositorio.owner.login}
          />
          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </Proprietario>
        <ListaIssues>
          {issues.map(issue => (
            <li key={String(issue)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {/* Por último */}
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </ListaIssues>
      </Container>
    );
  }
}

export default Repositorio;
