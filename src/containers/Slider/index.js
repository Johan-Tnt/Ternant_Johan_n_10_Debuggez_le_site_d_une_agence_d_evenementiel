import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trie les événements par date décroissante
  const byDateDesc =
    data?.focus?.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    ) || [];

  // Passe à la prochaine carte après 5 secondes
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };

  // Exécute `nextCard` à chaque rendu du composant
  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={event.id || event.title}>
          {/* Utilise `event.id` comme clé unique */}
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`radio-${event.id}`} // Clé unique basée sur l'index
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)} // Change l'index au clic
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
