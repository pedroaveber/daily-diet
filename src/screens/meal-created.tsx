import { Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import HealthlyMealPng from '@assets/healthly-meal-registerd.png'
import NonHealthlyMealPng from '@assets/non-healthly-meal-registerd.png'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Button } from '@components/button'

type MealCreatedParams = {
  healthly: boolean
}

export function MealCreated() {
  const navigation = useNavigation()
  const router = useRoute()

  const { healthly } = router.params as MealCreatedParams

  function handleGoBackHome() {
    navigation.navigate('home')
  }

  return (
    <SafeAreaView className="flex-1 p-6 bg-white items-center justify-center">
      {healthly ? (
        <>
          <Text className="text-green-700 font-nunito-bold text-2xl">
            Continue assim!
          </Text>
          <Text className="text-base mt-2 text-gray-950 font-nunito">
            Você continua{' '}
            <Text className="font-nunito-bold">dentro da dieta.</Text> Muito
            bem!
          </Text>

          <Image source={HealthlyMealPng} className="my-8" alt="" />
        </>
      ) : (
        <>
          <Text className="text-red-700 font-nunito-bold text-2xl">
            Que pena!
          </Text>
          <Text className="text-base mt-2 text-gray-950 font-nunito">
            Você <Text className="font-nunito-bold">saiu da dieta</Text> dessa
            vez, mas continue se esforçando e não desista!
          </Text>

          <Image source={NonHealthlyMealPng} className="my-8" alt="" />
        </>
      )}

      <Button
        onPress={handleGoBackHome}
        content="Ir a página inicial"
        style={{ width: 'auto' }}
      />
    </SafeAreaView>
  )
}
