/* eslint-disable camelcase */
import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito'
import { Loading } from '@components/loading'
import { Routes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  })

  return fontsLoaded ? <Routes /> : <Loading />
}
