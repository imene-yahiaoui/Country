import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import schema from "./schema.json";
import uischema from "./uischema.json";
import {
  Button,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css"
// Define the data type for each country entry
interface CountryEntry {
  name: string;
  country: string;
  percentage: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<CountryEntry>({ name: "", country: "", percentage: 0 });
  const [countriesList, setCountriesList] = useState<CountryEntry[]>([]);
  const [totalPercentage, setTotalPercentage] = useState<number>(0);

  /**
   * Updates `data` state with the form's current values
   * @param {Object} param0 - Destructured data object from JSONForms event
   */
  const handleDataChange = ({ data }: { data: CountryEntry }) => {
    setData(data);
  };

  /**
   * Adds a country and percentage entry to the list, if valid.
   * Ensures the total percentage does not exceed 100%.
   * Resets `data` after adding a valid entry.
   */
  const handleAddCountry = () => {
    if (!data.name) {
      alert("Veuillez entrer un nom.");
      return;
    }
    if (data.country && data.percentage) {
      const newCountriesList = [...countriesList, { ...data }];
      const newTotal = newCountriesList.reduce(
        (sum, item) => sum + item.percentage,
        0
      );

      if (newTotal <= 100) {
        setCountriesList(newCountriesList);
        setTotalPercentage(newTotal);
        setData({ name: "", country: "", percentage: 0 });
      } else {
        alert("La somme des pourcentages ne doit pas dépasser 100 %.");
      }
    } else {
      alert("Veuillez sélectionner un pays et entrer un pourcentage.");
    }
  };

  /**
   * Deletes a selected country entry by index and updates the total percentage.
   * @param {number} index - The index of the country to remove
   */
  const handleDeleteCountry = (index: number) => {
    const updatedList = countriesList.filter((_, i) => i !== index);
    const updatedTotal = updatedList.reduce(
      (sum, item) => sum + item.percentage,
      0
    );
    setCountriesList(updatedList);
    setTotalPercentage(updatedTotal);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestion des Pays et Pourcentages</h1>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={handleDataChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCountry}
        style={{ marginTop: "10px" }}
      >
        Ajouter
      </Button>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Liste des pays et pourcentages
      </Typography>
      <List>
        {countriesList.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                color="secondary"
                onClick={() => handleDeleteCountry(index)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`${item.country}: ${item.percentage}%`} />
          </ListItem>
        ))}
      </List>

      <Typography
        variant="body1"
        color={totalPercentage === 100 ? "green" : "red"}
      >
        Total des pourcentages : {totalPercentage}%
      </Typography>

      {totalPercentage !== 100 && (
        <Typography variant="body2" color="red">
          Pour être valide, la somme doit faire 100 %.
        </Typography>
      )}
    </div>
  );
};

export default App;
