import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
import PokemonCard from '../components/pokemon-card';
  
const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
  useEffect(() => {
    setPokemons(POKEMONS);
  }, []);
  
  return (
    <div>
      <p className='center'>Il y a <b>{pokemons.length}</b> pokémon{pokemons.length > 1 ? 's' : ''} dans le pokédex</p>
      <div className="container"> 
        <div className="row"> 
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
        </div>
      </div>
    </div> 
  );
}
  
export default PokemonList;