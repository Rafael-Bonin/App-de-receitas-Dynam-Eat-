import React from 'react';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function CardDones(props) {
  const {
    type,
    image,
    category,
    name,
    date,
    tags,
    index,
    alcoholicOrNot,
    nationality,
    id,
    history,
  } = props;
  const sendToDetails = (types) => (types === 'food'
    ? history.push(`/foods/${id}`)
    : history.push(`/drinks/${id}`));

  return (
    <section>
      <button type="button" onClick={ () => sendToDetails(type) }>
        <img
          style={ { width: '30%' } }
          data-testid={ `${index}-horizontal-image` }
          alt="im"
          src={ image }
        />
      </button>
      {type === 'food' ? (
        <h3 data-testid={ `${index}-horizontal-top-text` }>
          {nationality}
          {' '}
          -
          {' '}
          {category}
        </h3>
      ) : (
        <h3 data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</h3>
      )}
      <button onClick={ () => sendToDetails(type) } type="button">
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      </button>
      <h3 data-testid={ `${index}-horizontal-done-date` }>{date}</h3>
      <button
        type="button"
        onClick={ () => (type === 'food'
          ? copy(`http://localhost:3000/foods/${id}`)
          : copy(`http://localhost:3000/drinks/${id}`)) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="im"
        />
      </button>
      {type === 'food'
        && tags.map(
          (tag, indice) => indice <= 1 && (
            <p data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          ),
        )}
    </section>
  );
}

CardDones.propTypes = {
  type: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  index: propTypes.string.isRequired,
  alcoholicOrNot: propTypes.string.isRequired,
  nationality: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  history: propTypes.string.isRequired,
};
