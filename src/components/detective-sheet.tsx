"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

interface SectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const Section: React.FC<SectionProps> = ({
  title,
  items,
  selectedItems,
  setSelectedItems,
}) => {
  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "#2c3e50" }}>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} key={item}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedItems.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    sx={{ color: "#f1c40f" }}
                  />
                }
                label={<Typography sx={{ color: "white" }}>{item}</Typography>}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export const DetetiveSheet: React.FC = () => {
  const suspects = [
    "Sargento Bigode (Policial)",
    "Senhor Marinho (Advogado Ambicioso)",
    "Senhorita Rosa (Atriz)",
    "Sérgio Soturno (Coveiro)",
    "Dona Branca (Florista)",
    "Tony Gourmet (Chef de Cozinha)",
    "Dona Violeta (Escritora)",
    "Mordomo James (Mordomo)",
  ];

  const weapons = [
    "Arma química",
    "Espingarda",
    "Pá",
    "Faca",
    "Veneno",
    "Pé-de-cabra",
    "Soco inglês",
    "Tesoura",
  ];

  const locations = [
    "Mansão",
    "Hospital",
    "Cemitério",
    "Restaurante",
    "Boate",
    "Prefeitura",
    "Praça",
    "Hotel",
    "Banco",
    "Biblioteca",
    "Estação de Trem",
  ];

  const [selectedSuspects, setSelectedSuspects] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedSuspects");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [selectedWeapons, setSelectedWeapons] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedWeapons");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [selectedLocations, setSelectedLocations] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedLocations");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedSuspects",
        JSON.stringify(selectedSuspects)
      );
    }
  }, [selectedSuspects]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedWeapons", JSON.stringify(selectedWeapons));
    }
  }, [selectedWeapons]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedLocations",
        JSON.stringify(selectedLocations)
      );
    }
  }, [selectedLocations]);

  return (
    <div>
      <Section
        title="Suspeitos"
        items={suspects}
        selectedItems={selectedSuspects}
        setSelectedItems={setSelectedSuspects}
      />
      <Section
        title="Armas"
        items={weapons}
        selectedItems={selectedWeapons}
        setSelectedItems={setSelectedWeapons}
      />
      <Section
        title="Locais"
        items={locations}
        selectedItems={selectedLocations}
        setSelectedItems={setSelectedLocations}
      />
    </div>
  );
};
