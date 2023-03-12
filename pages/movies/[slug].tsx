import client from "../../lib/sanity"
import { GetStaticPaths, GetStaticProps } from "next"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme()

export default function Page({ data }: any) {
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
              {data.title}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid>
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
                  image={data.poster.asset.url}
                  alt="movie poster"
                  sx={{
                    width: {
                      md: 2 / 5,
                    },
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <u>Summary</u>
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Cast Members
          </Typography>
        </Container>
        <Grid container spacing={4}>
          {data.castMembers &&
            data.castMembers.map((member: any) => (
              <Grid item key={member} xs={6} sm={4} md={2}>
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
                    image={member.person.image.asset.url}
                    alt="cast member"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom component="h6">
                      {member.person.name}
                    </Typography>
                    <Typography gutterBottom color="gray" component="h6">
                      {member.characterName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </main>
    </ThemeProvider>
  )
}

const moviesQuery = `*[_type == "movie" && slug.current == $slug][0]{
  title,
  poster{
    asset->{
      url,
    }
  },
  "summary": overview[0].children[0].text,
  releaseDate,
  castMembers[]{
    characterName,
    person->{
      name,
      image{
        asset->{
          url
        }
      }
    }
  }
}`

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "movie" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`

  const paths = await client.fetch(query)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const options = { slug: params?.slug ?? `` }

  const movie = await client.fetch(moviesQuery, options)

  return {
    props: {
      data: movie,
    },
  }
}
