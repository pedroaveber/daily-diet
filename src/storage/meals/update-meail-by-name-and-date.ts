import { MealDTO } from 'src/@dtos/meal-dto'
import { isEqual, parseISO } from 'date-fns'
import { getMeals } from './get-meals'
import { AppError } from '@utils/errors/app-error'
import { MEAL_STORAGE_KEY } from '@storage/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteMealByNameAndDate } from './delete-meal-by-name-and-date'

export async function updateMeal(meal: MealDTO, name: string, date: string) {
  await deleteMealByNameAndDate(name, date)
  const storedMeals = await getMeals()

  // Compare meal name and date with stored meals
  const mealAlreadyRegistered = storedMeals.some(
    (item) =>
      item.name.toLocaleLowerCase() === meal.name.toLocaleLowerCase() &&
      isEqual(parseISO(item.date), parseISO(meal.date)),
  )

  if (mealAlreadyRegistered) {
    throw new AppError('Esta refeição já está cadastrada')
  }

  const meals = [...storedMeals, meal]
  const storage = JSON.stringify(meals)

  await AsyncStorage.setItem(MEAL_STORAGE_KEY, storage)
}
