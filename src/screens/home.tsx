import { Alert, SectionList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@components/header'
import { DietResume } from '@components/diet-resume'
import { Button } from '@components/button'
import { format, parseISO } from 'date-fns'
import { Meal } from '@components/meal'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getMeals } from '@storage/meals/get-meals'
import { useCallback, useState } from 'react'
import { Loading } from '@components/loading'

interface SectionListData {
  title: string
  data: {
    hour: string
    name: string
    healthly: boolean
    id: string
  }[]
}

interface Metrics {
  totalMeals: number
  totalHealthlyMeals: number
}

export function Home() {
  const [registeredMeals, setRegisteredMeals] = useState<SectionListData[]>([])
  const [isFetchig, setIsFetching] = useState(true)

  const [metrics, setMetrics] = useState<Metrics>({
    totalHealthlyMeals: 0,
    totalMeals: 0,
  })

  const navigation = useNavigation()

  function handleNavigateToNewMeal() {
    navigation.navigate('new-meal')
  }

  function handleGetMealDetails(id: string) {
    navigation.navigate('meal-details', { id })
  }

  async function fetchMeals() {
    setIsFetching(true)

    try {
      const meals = await getMeals()
      const data: SectionListData[] = []

      if (meals.length === 0) {
        return setRegisteredMeals([])
      }

      for (const meal of meals) {
        const date = meal.date
        const dateIndex = data.findIndex((item) => item.title === date)
        const dateAlreadyExists = dateIndex !== -1

        if (dateAlreadyExists) {
          data[dateIndex].data.push({
            id: meal.id,
            hour: meal.time,
            name: meal.name,
            healthly: meal.healthly,
          })
        } else {
          data.push({
            title: date,
            data: [
              {
                id: meal.id,
                hour: meal.time,
                name: meal.name,
                healthly: meal.healthly,
              },
            ],
          })
        }
      }

      setMetrics({
        totalMeals: meals.length,
        totalHealthlyMeals: meals.filter((meal) => meal.healthly).length,
      })
      setRegisteredMeals(data)
    } catch (error) {
      Alert.alert('Erro ao buscar refeições', 'Ocorreu um erro inesperado')
    } finally {
      setIsFetching(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMeals()
    }, []),
  )

  return (
    <SafeAreaView className="flex-1 p-6 bg-zinc-50">
      <Header />

      <DietResume
        percentage={(metrics.totalHealthlyMeals / metrics.totalMeals) * 100}
      />

      <View className="w-full items-start gap-2">
        <Text className="font-nunito text-gray-950 text-base">Refeições</Text>

        <Button
          onPress={handleNavigateToNewMeal}
          activeOpacity={0.85}
          icon="plus"
          content="Nova refeição"
        />
      </View>

      {isFetchig ? (
        <Loading />
      ) : (
        <SectionList
          className="mt-8"
          sections={registeredMeals}
          keyExtractor={(_, index) => index.toString()}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <Text className="font-nunito-bold text-gray-950 text-lg mb-2">
                {format(parseISO(title), 'dd.MM.yy')}
              </Text>
            )
          }}
          renderItem={({ item }) => {
            return (
              <Meal
                onPress={() => handleGetMealDetails(item.id)}
                hour={item.hour}
                name={item.name}
                onDiet={item.healthly}
              />
            )
          }}
        />
      )}
    </SafeAreaView>
  )
}
