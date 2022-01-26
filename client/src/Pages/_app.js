// import App from 'next/app'
import { ThemeProvider, Box } from '@mui/material';
import theme from '../theme'
import { SnackbarProvider } from 'notistack';
import ResponsiveDrawer from '../Components/Drawer';
import { SessionProvider } from "next-auth/react"
import '../index.css'
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const drawerWidth = 240;

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {

  const router = useRouter()

  return (
    // <AuthContextProvider>
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <ResponsiveDrawer />
          <Box
            component="main"
            sx={{ width: { sm: !(['/', '/login', '/signup'].includes(router.pathname)) ? `calc(100% - ${drawerWidth}px)` : '100%' }, ml: { sm: !(['/', '/login', '/signup'].includes(router.pathname)) && `${drawerWidth}px` }, mt: 4, pt: 4 }}
          >
            <Component {...pageProps} />
          </Box>
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
    // </AuthContextProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp