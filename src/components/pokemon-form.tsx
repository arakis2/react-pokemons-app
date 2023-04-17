import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { useHistory } from 'react-router-dom';
import Form from '../helpers/form-form-property';
import Field from '../helpers/form-field-property';
import validateForm from '../validation/pokemon-form-validation';
import isTypesValid from '../validation/pokemon-type-validation';

  
type Props = {
  pokemon: Pokemon
};

  
const PokemonForm: FunctionComponent<Props> = ({pokemon}) => {
  
    const [form, setForm] = useState<Form>({
        name: {value: pokemon.name, isValid: true},
        hp: {value: pokemon.hp, isValid: true},
        cp: {value: pokemon.cp, isValid: true},
        types: {value: pokemon.types, isValid: true},
    });

    const history = useHistory();

    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ].sort();

    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField});
    }

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        const checked = e.target.checked;
        let newField: Field;

        if(checked) {
        // Si l'utilisateur coche un type, à l'ajoute à la liste des types du pokémon.
        const newTypes: string[] = form.types.value.concat([type]);
        newField = { value: newTypes };
        } else {
        // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
        const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
        newField = { value: newTypes };
        }

        setForm({...form, ...{ types: newField }});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newForm: Form = form;
        const validform = validateForm(newForm);
        
        setForm(validform.form);
        
        if(validform.isValid){
            history.push(`/pokemons/${pokemon.id}`);
        }
        
    }
   
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                  {form.name.error && 
                    <div className='card-panel red accent-1'>
                        {form.name.error}
                    </div>
                  }
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                  {form.hp.error && 
                    <div className='card-panel red accent-1'>
                        {form.hp.error}
                    </div>
                  }
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                  {form.cp.error && 
                    <div className='card-panel red accent-1'>
                        {form.cp.error}
                    </div>
                  }
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" checked={(hasType(type))} disabled={!isTypesValid(form, type)} onChange={e => selectType(type, e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default PokemonForm;