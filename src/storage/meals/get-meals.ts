import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEAL_STORAGE_KEY } from '@storage/config'
import { MealDTO } from 'src/@dtos/meal-dto'

export async function getMeals(): Promise<MealDTO[]> {
  const meals = await AsyncStorage.getItem(MEAL_STORAGE_KEY)

  if (!meals) {
    return []
  }

  const parsedMeals = JSON.parse(meals) as MealDTO[]

  return parsedMeals.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return dateB.getTime() - dateA.getTime()
  })
}
