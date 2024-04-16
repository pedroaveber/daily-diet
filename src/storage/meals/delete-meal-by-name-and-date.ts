import { getMeals } from './get-meals'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEAL_STORAGE_KEY } from '@storage/config'

export async function deleteMealByNameAndDate(name: string, date: string) {
  const storedMeals = await getMeals()

  const mealIndex = storedMeals.findIndex(
    (item) =>
      item.name.toLocaleLowerCase() === name.toLocaleLowerCase() &&
      item.date === date,
  )

  if (mealIndex === -1) {
    throw new Error('Refeição não encontrada')
  }

  const meals = storedMeals.splice(mealIndex, 1)

  const storage = JSON.stringify(meals)
  await AsyncStorage.setItem(MEAL_STORAGE_KEY, storage)
}
