import { Button } from '@components/button'
import { Loading } from '@components/loading'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { deleteMealById } from '@storage/meals/delete-meal-by-id'
import { getMealById } from '@storage/meals/get-meal-by-id'
import { AppError } from '@utils/errors/app-error'
import { format, parseISO } from 'date-fns'
import { ArrowLeft } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MealDTO } from 'src/@dtos/meal-dto'
import { gray } from 'tailwindcss/colors'

interface RouteParams {
  id: string
}

export function MealDetails() {
  const [isFetching, setIsFetching] = useState(true)
  const [meal, setMeal] = useState<MealDTO>({} as MealDTO)

  const route = useRoute()
  const navigation = useNavigation()
  const { id } = route.params as RouteParams

  const isHealthly = meal.healthly

  function handleGoBackHome() {
    navigation.navigate('home')
  }

  function handleNavigateToEditMeal() {
    navigation.navigate('edit-meal', { id })
  }

  async function getMealDetails() {
    setIsFetching(true)
    try {
      const data = await getMealById(id)
      setMeal(data)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Detalhes da refeição', error.message)
      } else {
        Alert.alert('Detalhes da refeição', 'Ocorreu um erro inesperado')
      }
    } finally {
      setIsFetching(false)
    }
  }

  async function handleDeleteMeal() {
    try {
      Alert.alert(
        'Excluir refeição',
        'Deseja realmente excluir essa refeição?',
        [
          { style: 'default', text: 'Cancelar' },
          {
            style: 'destructive',
            text: 'Excluir',
            onPress: async () => {
              await deleteMealById(id)
              navigation.navigate('home')
            },
          },
        ],
      )
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Excluir refeição', error.message)
      } else {
        Alert.alert('Excluir refeição', 'Ocorreu um erro inesperado')
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMealDetails()
    }, []),
  )

  return isFetching ? (
    <Loading />
  ) : (
    <SafeAreaView
      className={`flex-1 w-full ${isHealthly ? 'bg-green-50' : 'bg-red-50'}`}
    >
      <View className="w-full relative p-6 items-center flex-row justify-center">
        <TouchableOpacity
          className="absolute left-6"
          onPress={handleGoBackHome}
        >
          <ArrowLeft size={24} color={gray[950]} />
        </TouchableOpacity>

        <Text className="text-center font-nunito-bold text-gray-950 text-lg">
          Refeição
        </Text>
      </View>

      <View className="flex-1 pb-10 bg-white rounded-t-[20px] -mb-8 p-6 pt-8">
        <Text className="text-xl font-nunito-bold text-gray-950 mt-4">
          {meal.name}
        </Text>

        <Text className="text-base font-nunito text-gray-950">
          {meal.description}
        </Text>

        <Text className="text-base font-nunito-bold text-gray-950 mt-8">
          Data e hora
        </Text>

        <Text className="text-base font-nunito text-gray-950">
          {format(parseISO(meal.date), 'dd/MM/yyyy')} às {meal.time}
        </Text>

        <View className="h-9 mt-6 w-44 flex px-4 flex-row items-center justify-center bg-zinc-200 rounded-full">
          <View
            className={`h-3.5 w-3.5 rounded-full mr-3 ${meal.healthly ? 'bg-green-700' : 'bg-red-700'}`}
          />

          <Text className="text-base font-nunito text-gray-800">
            {meal.healthly ? 'dentro da dieta' : 'fora da dieta'}
          </Text>
        </View>

        <View className="w-full mt-auto">
          <Button
            onPress={handleNavigateToEditMeal}
            content="Editar refeição"
            icon="pencil"
          />
        </View>

        <View className="w-full mb-8 mt-2">
          <Button
            onPress={handleDeleteMeal}
            variant="outline"
            content="Excluir refeição"
            icon="trash-can"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
