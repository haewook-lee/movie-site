import React, { useEffect, useState } from "react"
import client from "../../lib/sanity"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme()

export default function Album() {
  const [screenings, setScreenings] = useState<any[]>([])

  useEffect(() => {
    client
      .fetch(
        `*[_type == "screening"] | order(published desc){
      title,
      'movie': movie->{
        poster{
          asset->{
            url,
          }
        },
      },
      published,
      location,
      beginAt,
      endAt,
      allowedGuests,
    }`
      )
      .then((data) => setScreenings(data))
      .catch(console.error)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Screenings
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              A list of all screenings for sci-fi movies!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {screenings &&
              screenings.map((screening) => (
                <Grid item key={screening}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        md: "row",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={screening.movie.poster.asset.url}
                      alt="movie poster"
                      sx={{
                        width: {
                          md: 2 / 5,
                        },
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {screening.title}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <u>Start Time:</u>{" "}
                        {new Date(screening.beginAt).toString()}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <u>End Time:</u> {new Date(screening.endAt).toString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  )
}
