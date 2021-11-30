import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  // objeto musica
  const produto = props.data;
  return (
    <Link to={`/view/${produto._id}`} className="col">
      <div className="card">
        <img src={produto.capa} alt={produto.nome} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{produto.nome}</h5>
          <span className="badge bg-primary">{produto.genero}</span>
        </div>
      </div>
    </Link>
  )
}

export default Card
