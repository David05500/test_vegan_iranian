import Header from '../components/shared/Header'
import '../assets/styles/main.css'
import AppProvider from '../context/app.provider'
import StripeProvider from '../context/Stripe/provider'

const MyApp = ({ Component, pageProps, router }) => (
  <AppProvider>
    <StripeProvider>
      {router.route !== '/' && <Header />}
        <Component {...pageProps} key={router.route} />
    </StripeProvider>
  </AppProvider>
)

export default MyApp