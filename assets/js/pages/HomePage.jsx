import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { BarChart } from '@mui/x-charts/BarChart';

function HomePage() {
  const { isAdmin, setIsAuthenticated, isAuthenticated, decodedToken } = useAuth();

  // Données fictives sur les maladies chroniques, y compris la maladie de Crohn
  const chronicDiseaseData = [
    { title: "Diabète", value: 250 },
    { title: "Hypertension", value: 300 },
    { title: "Asthme", value: 150 },
    { title: "Maladie de Crohn", value: 5 }, // Ajout de la maladie de Crohn et données fictives
  ];

  return (
    <Box display="flex">
      {/* Graphique à Barres */}
      <Box>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              scaleType: 'band',
            },
          ]}
          series={[{ data: [1, 2, 3, 2, 3, 1, 3, 2, 1, 2, 2] }]}
          width={1000}
          height={800}
        />
      </Box>

      {/* Cartes avec des chiffres sur les maladies chroniques */}
      <Box marginLeft={4}>
        <Grid container spacing={2}>
          {chronicDiseaseData.map((disease, index) => (
            <Grid item key={index} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {disease.title}
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {disease.value}
                  </Typography>
                  {/* Sous-titre pour la maladie de Crohn, montrant les fois dans la vie */}
                  {disease.title === "Maladie de Crohn" && (
                    <Typography variant="body2" color="textSecondary">
                      Nombre de fois dans la vie
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
