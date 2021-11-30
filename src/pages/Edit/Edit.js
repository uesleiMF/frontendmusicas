import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../api/api";

const Edit = () => {
  const navigate = useNavigate();
  //declarar o estado da musica
  const [produto, setProduto] = useState({
    nome: '',
    autor: '',
    genero: '',
    capa: '',
    duracao: ''
  });
  
  useEffect(() => {
    getProdutoById();
  }, []);

  // buscar a musica que ja foi cadastrado no banco.
  // buscar a musica pelo o id passado via parametro da url.
  const { id } = useParams();

  //buscar a musica por id;
  const getProdutoById = async () => {
    const request = await Api.fetchGetById(id);
    const produto = await request.json();
    setProduto(produto);
  };

  const handleFieldsChange = (evento) => {
    // copio o objeto do estado.
    const produtoEdit = { ...produto };
    // musicaEdit['nome'] = 'novo valor'
    // atualiza os campos do objeto de forma dinamica de acordo com o input que o usuario digitou
    produtoEdit[evento.target.name] = evento.target.value;
    // atualzo estado musica
    setProduto(produtoEdit);
  }

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const request = await Api.fetchPut(produto, id);
    const data = await request.json();
    alert(data.message);
    navigate(`/view/${id}`);
  }

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-title">
          <div className="row">
            <div className="col">
              <h3 className="mx-3 my-3">Edição da Música</h3>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="nome">Nome da musica:</label>
                  <input
                    id="nome"
                    className="form-control"
                    type="text"
                    placeholder="Nome da musica"
                    value={produto.nome}
                    onChange={handleFieldsChange}
                    name="nome"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="autor">Nome do autor:</label>
                  <input
                    id="autor"
                    type="text"
                    className="form-control"
                    placeholder="Nome do autor"
                    onChange={handleFieldsChange}
                    value={produto.autor}
                    name="autor"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="genero">Genero da musica:</label>
                  <input
                    id="genero"
                    type="text"
                    className="form-control"
                    onChange={handleFieldsChange}
                    value={produto.genero}
                    placeholder="Genero da musica"
                    name="genero"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="capa">Capa do album:</label>
                  <input
                    id="capa"
                    type="text"
                    onChange={handleFieldsChange}
                    value={produto.capa}
                    className="form-control"
                    placeholder="URL da capa do album"
                    name="capa"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="duracao">Duração da musica:</label>
                  <input
                    id="duracao"
                    type="time"
                    onChange={handleFieldsChange}
                    value={produto.duracao}
                    className="form-control"
                    min="00:00"
                    max="10:00"
                    placeholder="Duraçao da musica"
                    name="duracao"
                  />
                </div>
              </div>
              <div className="col-4 d-flex align-items-end justify-content-around">
                <button type="submit" className="btn btn-success">
                  Enviar
                </button>
                <button type="button" className="btn btn-danger">
                  Voltar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
