import React, { useState } from "react";
import "./Receipe.css";

const Receipe = () => {
  const [receipe, setReceipe] = useState([]);
  const [receipeTable, setReceipeTable] = useState([]);
  const [errors, setErrors] = useState({});

  // ✅ Add multiple fields by storing an object in the state
  const onADD = () => {
    setReceipe([
      ...receipe,
      { id: Date.now().toString(), recipeName: "", ingredient: "", quantity: "", unit: "" },
    ]);
  };

  const onRemove = (id) => {
    setReceipe(receipe.filter((rec) => rec.id !== id));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[id]; // Remove error related to this item
      return newErrors;
    });
  };

  const handleInputChange = (id, field, value) => {
    setReceipe((prevReceipe) =>
      prevReceipe.map((rec) => (rec.id === id ? { ...rec, [field]: value } : rec))
    );

    // Clear error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: { ...prevErrors[id], [field]: value ? "" : prevErrors[id]?.[field] }
    }));
  };

  const validateFields = () => {
    let isValid = true;
    let newErrors = {};

    receipe.forEach((ing) => {
      let ingErrors = {};

      if (!ing.recipeName.trim()) {
        ingErrors.recipeName = "Recipe Name is required!";
        isValid = false;
      }
      if (!ing.ingredient.trim()) {
        ingErrors.ingredient = "Ingredient is required!";
        isValid = false;
      }
      if (!ing.quantity.trim()) {
        ingErrors.quantity = "Quantity is required!";
        isValid = false;
      }
      if (!ing.unit.trim()) {
        ingErrors.unit = "Please select a unit!";
        isValid = false;
      }

      if (Object.keys(ingErrors).length > 0) {
        newErrors[ing.id] = ingErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const submittedData = () => {
    if (validateFields()) {
      setReceipeTable((prevTable) => [...prevTable, ...receipe]);
      setReceipe([]);
      setErrors({});
    }
  };

  return (
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
              {errors[ing.id]?.recipeName && <span className="error">{errors[ing.id].recipeName}</span>}
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
              {errors[ing.id]?.ingredient && <span className="error">{errors[ing.id].ingredient}</span>}
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
              {errors[ing.id]?.quantity && <span className="error">{errors[ing.id].quantity}</span>}
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
              {errors[ing.id]?.unit && <span className="error">{errors[ing.id].unit}</span>}
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
  );
};

export default Receipe;
