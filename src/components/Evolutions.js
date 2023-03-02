import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvolutionChain } from "./GetPokemonApi";
import "../css/estiloPokemons.css";

const Evolutions = () => {
  const [evolutionChain, setEvolutionChain] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getEvolution = async () => {
      const response = await getEvolutionChain(id);
      setEvolutionChain(response);
    };
    getEvolution();
  }, [id]);

  const getEvolutionImageUrl = (evolution) => {
    const id = evolution.species.url.split("/")[6];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

  const renderEvolutions = (evolutions) => {
    return evolutions.map((evolution) => (
      <div key={evolution.species.name}>
          <div className="row row-cols-1 row-cols-md-5">
            <div className="col card text-bg-dark mt-2">
              <h4 className="m-2">{evolution.species.name}</h4>
              <img
                src={getEvolutionImageUrl(evolution)}
                className="img-evolution"
                alt={evolution.species.name}
              />
              <div className="container">
                {evolution.evolution_details[0] && (
                  <div>
                    <div>Level: {evolution.evolution_details[0].min_level}</div>
                  </div>
                )}
              </div>
            </div>
        </div>

        <div>
          {evolution.evolves_to.length > 0 && (
            <div>{renderEvolutions(evolution.evolves_to)}</div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="container">
        {evolutionChain.chain && renderEvolutions([evolutionChain.chain])}
      </div>
      <div className="container">
        <Link to={"/api-pokemon-github"}>
          <button type="button" className="btn btn-primary mt-2 mb-2 col-12">
            Inicio
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Evolutions;
