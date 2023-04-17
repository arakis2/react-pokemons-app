/*
    Composant non prévu par le tutoriel mais, pour moi, les types doivent avoir une gestion à part.
*/

import React, { FunctionComponent} from 'react';
import formatType from '../helpers/format-type';

type Props = {
    types: string[],
  };

const PokemonTypes: FunctionComponent<Props> = ({types}) => {
    types = types.sort();
    return (
        <div>
            {types.map( type => (
                    <span key={type} className={formatType(type)}>{type}</span>
                )
            )}
        </div>
    );
}

export default PokemonTypes;