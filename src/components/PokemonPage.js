import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "./GetPokemonApi";
import Cargando from "./Cargando";
import "../css/estiloPokemons.css";

const PokemonPage = () => {
  const [pokemonId, setPokemonId] = useState({});
  //const [evolutionChain, setEvolutionChain] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function findPokemonId() {
      setCargando(true);
      try {
        const response = await getPokemonById(id);
        setPokemonId(response);
        setCargando(false);
      } catch (error) {
        setError(error.message);
        setCargando(false);
      }
    }
    findPokemonId();
  }, [id]);

  if (cargando) {
    return <Cargando />;
  }

  if (error) {
    return (
      <p>Algo salio mal al traer la informacion del pokemon: {error.message}</p>
    );
  }

  return (
    <div className="container">
      <div className="card mb-3 mt-3 bg-success" style={{ cursor: "pointer" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <h2 className="mt-2 m-2" key={pokemonId.id.toString()}>
              Id: {pokemonId.id}
            </h2>
            <img
              src={pokemonId.sprites.other.dream_world.front_default}
              className="m-2 img-pokemon"
              alt={pokemonId.name}
            />
            <div className="mt-2 m-2">
              <span className="m-2">height: {pokemonId.height}</span>
              <span className="m-2">weight: {pokemonId.weight}Kg</span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">Name: {pokemonId.name}</h3>
              <div className="row row-cols-2 row-cols-md-3 mt-2">
                <div>
                  <h4 className="mt-4 titulo">Hp</h4>
                  <div className="valores">{pokemonId.stats[0].base_stat}</div>
                </div>
                <div>
                  <h4 className="mt-4 titulo">Attack</h4>
                  <div className="valores">{pokemonId.stats[1].base_stat}</div>
                </div>
                <div>
                  <h4 className="mt-4 titulo">Defense</h4>
                  <div className="valores">{pokemonId.stats[2].base_stat}</div>
                </div>
                <div>
                  <h4 className="mt-4 titulo">Special Attack</h4>
                  <div className="valores">{pokemonId.stats[3].base_stat}</div>
                </div>
                <div>
                  <h4 className="mt-4 titulo">Special Defense</h4>
                  <div className="valores">{pokemonId.stats[4].base_stat}</div>
                </div>
                <div>
                  <h4 className="mt-4 titulo">Speed</h4>
                  <div className="valores">{pokemonId.stats[5].base_stat}</div>
                </div>
              </div>
              <h6 className="mt-4 titulo">
                Tipo y Tipos de cualidades de un pokemon
              </h6>
              <div className="row row-cols-2 row-cols-md-2 mt-3">
                {pokemonId.types.map((tipo) => (
                  <div key={tipo.type.name} className="titulo">
                    <div>
                      <h2 key={tipo.slot}>{tipo.type.name}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          className=""
          to={`/evolutions/${pokemonId.id}`}
        >
          <button type="button" className="btn btn-primary">
            Show Evolutions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonPage;
