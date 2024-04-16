import { AppError } from '@utils/errors/app-error'
import { getMeals } from './get-meals'

export async function getMealById(id: string) {
  const storedMeals = await getMeals()

  const meal = storedMeals.find((item) => item.id === id)

  if (!meal) {
    throw new AppError('Refeição não encontrada')
  }

  return meal
}
