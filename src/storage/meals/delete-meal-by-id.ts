import { getMeals } from './get-meals'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEAL_STORAGE_KEY } from '@storage/config'

export async function deleteMealById(id: string) {
  const storedMeals = await getMeals()
  const meals = storedMeals.filter((item) => item.id !== id)

  const storage = JSON.stringify(meals)
  await AsyncStorage.setItem(MEAL_STORAGE_KEY, storage)
}
