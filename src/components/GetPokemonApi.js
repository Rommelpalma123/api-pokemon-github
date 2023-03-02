export const GetPokemonApi = async (limit, offset) => {
  const respuesta = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

  const data = await respuesta.json();

  const allPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const pokemonRespuesta = await fetch(pokemon.url);
      const pokemonData = await pokemonRespuesta.json();

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.other.dream_world.front_default,
      };
    })
  );

  return allPokemons;
};

export const getPokemonById = async (id) => {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await respuesta.json();
  return data;
};


export const getEvolutionChain = async (id) => {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const species = await respuesta.json();
    const chainRespuesta = await fetch(species.evolution_chain.url);
    const chain = await chainRespuesta.json();
    return chain;

  } catch (error) {
    console.error(error);
  }
};
