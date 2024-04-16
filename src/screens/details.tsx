import { Loading } from '@components/loading'
import { PercentageHighlight } from '@components/percentage-highlight'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getMeals } from '@storage/meals/get-meals'
import { ArrowLeft } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { TouchableOpacity, View, Text, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { green, red } from 'tailwindcss/colors'

interface Metrics {
  totalMeals: number
  totalHealthlyMeals: number
  totalUnhealthlyMeals: number
  bestStreak: number
}

export function Details() {
  const [metrics, setMetrics] = useState<Metrics>({
    bestStreak: 0,
    totalHealthlyMeals: 0,
    totalMeals: 0,
    totalUnhealthlyMeals: 0,
  })

  const [isFetching, setIsFetching] = useState(true)

  const navigation = useNavigation()
  const percentage = (metrics.totalHealthlyMeals / metrics.totalMeals) * 100

  function handleGoBackHome() {
    navigation.navigate('home')
  }

  async function getMetrics() {
    setIsFetching(true)

    try {
      const meals = await getMeals()
      let bestHealthlyStreak = 0
      let currentHealthlyStreak = 0

      for (const meal of meals) {
        currentHealthlyStreak = meal.healthly ? currentHealthlyStreak + 1 : 0
        if (currentHealthlyStreak > bestHealthlyStreak) {
          bestHealthlyStreak = currentHealthlyStreak
        }
      }

      setMetrics({
        totalMeals: meals.length,
        bestStreak: bestHealthlyStreak,
        totalHealthlyMeals: meals.filter((meal) => meal.healthly).length,
        totalUnhealthlyMeals: meals.filter((meal) => !meal.healthly).length,
      })
    } catch (error) {
      Alert.alert('Erro ao buscar métricas', 'Ocorreu um erro inesperado')
    } finally {
      setIsFetching(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMetrics()
    }, []),
  )

  return isFetching ? (
    <Loading />
  ) : (
    <SafeAreaView
      className={`flex-1 pt-6 -mb-8 ${percentage >= 60 ? 'bg-green-50' : 'bg-red-50'}`}
    >
      <TouchableOpacity onPress={handleGoBackHome} className="w-full p-6">
        <ArrowLeft size={24} color={percentage >= 60 ? green[700] : red[700]} />
      </TouchableOpacity>

      <View className="w-full -mt-8 pb-8 items-center justify-center">
        <PercentageHighlight percentage={percentage} />
      </View>

      <View className="flex-1 bg-white rounded-t-[20px] p-6">
        <Text className="text-base mb-6 text-center font-nunito-bold text-gray-950">
          Estatíscas gerais
        </Text>

        <View className="w-full p-4 mb-2 items-center justify-center rounded-lg bg-gray-200">
          <Text className="text-2xl font-nunito-bold text-gray-950">
            {metrics.bestStreak}
          </Text>
          <Text className="text-base font-nunito text-gray-800 text-center">
            melhor sequência de pratos dentro da dieta
          </Text>
        </View>

        <View className="w-full p-4 mb-2 items-center justify-center rounded-lg bg-gray-200">
          <Text className="text-2xl font-nunito-bold text-gray-950">
            {metrics.totalMeals}
          </Text>
          <Text className="text-base font-nunito text-gray-800 text-center">
            Refeiçoes registradas
          </Text>
        </View>

        <View className="w-full flex flex-row box-border">
          <View className="w-1/2 pr-0.5">
            <View className="w-full p-4 mr-1 mb-2 items-center justify-center rounded-lg bg-green-50">
              <Text className="text-2xl font-nunito-bold text-gray-950">
                {metrics.totalHealthlyMeals}
              </Text>
              <Text className="text-base font-nunito text-gray-800 text-center">
                refeições dentro da dieta
              </Text>
            </View>
          </View>

          <View className="w-1/2 pl-0.5">
            <View className="w-full ml-1 p-4 mb-2 items-center justify-center rounded-lg bg-red-50">
              <Text className="text-2xl font-nunito-bold text-gray-950">
                {metrics.totalUnhealthlyMeals}
              </Text>

              <Text className="text-base font-nunito text-gray-800 text-center">
                refeições fora da dieta
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
