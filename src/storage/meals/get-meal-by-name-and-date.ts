import { AppError } from '@utils/errors/app-error'
import { getMeals } from './get-meals'

export async function getMealByNameAndDate(name: string, date: string) {
  const storedMeals = await getMeals()

  const meal = storedMeals.find(
    (item) =>
      item.name.toLocaleLowerCase() === name.toLocaleLowerCase() &&
      item.date === date,
  )

  if (!meal) {
    throw new AppError('Refeição não encontrada')
  }

  return meal
}
