import React, { useState } from "react";
import "./Receipe.css";

const Receipe = () => {
  const [receipe, setReceipe] = useState([]);
  const [receipeTable, setReceipeTable] = useState([]);
  const [error, setError] = useState({
    recipeName: "",
    quantity: "",
    unit: "",
  });

  
  const onADD = () => {
    setReceipe([
      ...receipe,
      { id: Date.now().toString(), recipeName: "", ingredient: "", quantity: "", unit: "" },
    ]);
  };

  
  const onRemove = (id) => {
    setReceipe(receipe.filter((rec) => rec.id !== id));
  };

  
  const handleInputChange = (id, field, value) => {
    setReceipe((prevReceipe) =>
      prevReceipe.map((rec) =>
        rec.id === id ? { ...rec, [field]: value } : rec
      )
    );
  };

  const submittedData = () => {
    setReceipeTable((prevTable) => [...prevTable, ...receipe]); 
    setReceipe([]); 
  };
  

  return (
    <>
      <div className="container">
        <h1 className="title">🍽️ Recipe Builder</h1>

        <button className="add-btn" type="button" onClick={onADD}>
          ➕ Add Ingredient
        </button>

        <div className="ingredient-list">
          {receipe.map((ing) => (
            <div className="ingredient-card" key={ing.id}>
              <div className="input-group">
                <label>Recipe Name</label>
                <input
                  type="text"
                  placeholder="Enter recipe name"
                  value={ing.recipeName}
                  onChange={(e) => handleInputChange(ing.id, "recipeName", e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Ingredient</label>
                <input
                  type="text"
                  name="ingredient"
                  placeholder="Ingredient"
                  value={ing.ingredient}
                  onChange={(e) => handleInputChange(ing.id, "ingredient", e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={ing.quantity}
                  onChange={(e) => handleInputChange(ing.id, "quantity", e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Unit</label>
                <select
                  name="unit"
                  id="unit"
                  value={ing.unit}
                  onChange={(e) => handleInputChange(ing.id, "unit", e.target.value)}
                >
                  <option value="">Select Unit</option>
                  <option value="MiliGram">MiliGM</option>
                  <option value="Gram">GM</option>
                  <option value="Kilogram">KG</option>
                  <option value="Liter">LI</option>
                </select>
              </div>

              <button className="remove-btn" onClick={() => onRemove(ing.id)}>
                ❌ Remove
              </button>
            </div>
          ))}
        </div>

        <button type="button" className="submit-btn" onClick={submittedData}>
          ✅ Submit Recipe
        </button>

        {receipeTable.length > 0 && (
          <table className="recipe-table">
            <thead>
              <tr>
                <th>Recipe Name</th>
                <th>Ingredient</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {receipeTable.map((table, index) => (
                <tr key={index}>
                  <td>{table.recipeName}</td>
                  <td>{table.ingredient}</td>
                  <td>{table.quantity}</td>
                  <td>{table.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Receipe;
