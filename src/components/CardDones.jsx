import React from 'react';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import './Cards.css';

const copy = require('clipboard-copy');

export default function CardDones(props) {
  const {
    type,
    image,
    // category,
    name,
    date,
    tags,
    index,
    // alcoholicOrNot,
    // nationality,
    id,
    // history,
  } = props;
  // const sendToDetails = (types) => (types === 'food'
  //   ? history.push(`/foods/${id}`)
  //   : history.push(`/drinks/${id}`));

  return (
    <section className="cards-body">
      <div className="cards-done-fav-body">
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="im"
          src={ image }
        />
        <div className="details-food-drink">
          <h3 data-testid={ `${index}-horizontal-top-text` }>{name}</h3>
        </div>
        <button onClick={ () => sendToDetails(type) } type="button">
          <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
        </button>
        <div className="details-food-drink">
          <h3 data-testid={ `${index}-horizontal-done-date` }>{date}</h3>
        </div>
        <button
          className="buttons-card-fav-done"
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
      </div>
    </section>
  );
}

CardDones.propTypes = {
  type: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  // category: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  index: propTypes.string.isRequired,
  // alcoholicOrNot: propTypes.string.isRequired,
  // nationality: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  // history: propTypes.string.isRequired,
};
