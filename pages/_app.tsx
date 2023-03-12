import type { AppProps } from "next/app"
import AppBar from "@mui/material/AppBar"
import TheatersOutlined from "@mui/icons-material/TheatersOutlined"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"

export default function App({ Component, pageProps }: AppProps) {
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://haewook-lee.github.io/">
          Haewook Lee
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    )
  }

  return (
    <>
      <CssBaseline />
      {/* Navbar */}
      <AppBar position="relative">
        <Toolbar>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button color="inherit" href="/">
              <TheatersOutlined />
            </Button>
            <Button color="inherit" href="/movies">
              Movies
            </Button>
            <Button color="inherit" href="/screenings">
              Screenings
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      {/* Component */}
      <Component {...pageProps} />
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Want to learn more?
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Created using NextJS and Sanity
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  )
}
