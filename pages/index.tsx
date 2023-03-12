import React, { useEffect, useState } from "react"
import client from "../lib/sanity"
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
  const [movies, setMovies] = useState<any[]>([])

  const baseURL = "https://haewook-lee.github.io/movie-site"

  useEffect(() => {
    client
      .fetch(
        `*[_type == "movie"] | order(releaseDate desc)[0...9]{
      title,
      slug,
      releaseDate,
      overview,
      poster{
        asset->{
          path,
          url,
        }
      },
    }`
      )
      .then((data) => setMovies(data))
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
              Movies Database
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              A collection of Sci-Fi movies over the years.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {movies &&
              movies.map((movie) => (
                <Grid item key={movie} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={
                        {
                          // 16:9
                          // pt: "56.25%",
                        }
                      }
                      image={movie.poster.asset.url}
                      alt="movie poster"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                      </Typography>
                      <Typography>
                        {movie.overview[0].children[0].text}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        href={baseURL + "/movies/" + movie.slug.current}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  )
}
