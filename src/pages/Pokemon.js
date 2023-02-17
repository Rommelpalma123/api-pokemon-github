import React, { useState, useEffect } from "react";
import { GetPokemonApi } from "../components/GetPokemonApi";
import Buscar from "../components/Buscar";
import { Link } from "react-router-dom";
import Cargando from "../components/Cargando";

const Pokemon = () => 
{
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  useEffect(() => 
  {
    async function getPokemons() 
    {
      setCargando(true);
      try 
      {
        const pokems = await GetPokemonApi(limit, offset);
        setPokemons(pokems);
        setFilteredPokemons(pokems);
        setCargando(false);
      } catch (error) 
      {
        setError(error.message);
        setCargando(false);
      }
    }
    getPokemons();
  }, [limit, offset]);

  const handleSearch = (searchTerm) => 
  {
    setFilteredPokemons(
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleLoadMore = () => 
  {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handleLoadPrevious = () => 
  {
    if (offset === 0) return;
    setOffset((prevOffset) => prevOffset - limit);
  };

  return (
    <div>
      <Buscar onSearch={handleSearch} />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4">
          {cargando ? (
            <h4>
              <Cargando />
            </h4>
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            filteredPokemons.map((pokemon) => (
              <Link
                to={`/pokemon/${pokemon.id}`}
                key={pokemon.id.toString()}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="mt-3 mb-3">
                  <div>
                    <div
                      className="card border-success text-bg-dark carta-inicio"
                      style={{ cursor: "pointer" }}
                    >
                      <p className="m-2">N-{pokemon.id}</p>
                      <div className="contenedor text-center">
                        <img
                          src={pokemon.image}
                          className="imagen-inicio"
                          alt={pokemon.name}
                        />
                      </div>
                      <div className="card-body">
                        <div class="texto">Tocame para verme mejor</div>
                        <h5 className="card-title m-2 pokemon-name">{pokemon.name}</h5>
                      </div>
                    </div>
                  </div>  
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="row row-cols-1 row-cols-md-2">
          <div>
            <button className="btn btn-primary mt-2 mb-2 col-12" onClick={handleLoadPrevious}>
              Previous
            </button>
          </div>
          <div>
            <button className="btn btn-primary mt-2 mb-2 col-12" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
