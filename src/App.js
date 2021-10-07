import React, { useState } from "react";
import { toppings } from "./utils/toppings";
import { combos } from "./utils/combos";
import "./styles.css";

/*class getcombo extends React.Component{

  render()
  {
    return(
      <div>
        <h1>Combos</h1>
      </div>
    );
  }

}

export default getcombo;*/
const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false),
    new Array(combos.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index,) => {
        if (currentState === true) {
          return sum + toppings[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    <div className="App">
    <h2>Combos</h2>
      <ul className="toppings-list">
      {combos.map(({ nombre, precio }, num) => {
          return (
            <li key={num}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="radio"
                    id={`custom-checkbox-${num}`}
                    name={nombre}
                    value={nombre}
                    checked={checkedState[num]}
                    onChange={() => handleOnChange(num)}
                  />
                  <label htmlFor={`custom-checkbox-${num}`}>{nombre}</label>
                </div>
                <div className="right-section">{getFormattedPrice(precio)}</div>
              </div>
            </li>
          );
        })}
        </ul>
      <h3>Select Toppings</h3>
      <ul className="toppings-list">
        {toppings.map(({ name, price }, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="toppings-list-item">
            <div className="left-section">Total:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
          </div>
        </li>
      </ul>
    </div>
  );
}