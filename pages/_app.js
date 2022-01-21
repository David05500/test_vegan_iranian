import Header from '../components/shared/Header'
import '../assets/styles/main.css'
import AppProvider from '../context/app.provider'

const MyApp = ({ Component, pageProps, router }) => (<AppProvider>
  {router.route !== '/' && <Header />}
  <Component {...pageProps} key={router.route} />
</AppProvider>)

export default MyApp