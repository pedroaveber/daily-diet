import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Details } from '@screens/details'
import { EditMeal } from '@screens/edit-meal'
import { Home } from '@screens/home'
import { MealCreated } from '@screens/meal-created'
import { MealDetails } from '@screens/meal-details'
import { NewMeal } from '@screens/new-meal'

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator()

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="details" component={Details} />
      <Screen name="new-meal" component={NewMeal} />
      <Screen name="edit-meal" component={EditMeal} />
      <Screen name="meal-created" component={MealCreated} />
      <Screen name="meal-details" component={MealDetails} />
    </Navigator>
  )
}
