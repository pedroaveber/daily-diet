import { View, Text } from 'react-native'

interface MealProps {
  hour: string
  name: string
  onDiet: boolean
}

export function Meal({ hour, name, onDiet }: MealProps) {
  return (
    <View className="w-full h-12 rounded-md border px-4 border-gray-200 mb-2 flex-row items-center justify-start">
      <Text className="text-gray-950 text-sm font-nunito-bold">{hour}</Text>

      <View className="h-4 w-px mx-2 bg-gray-400" />

      <Text className="text-gray-800 flex-1 text-base font-nunito">{name}</Text>

      <View
        className={`w-4 h-4 rounded-full ${onDiet ? 'bg-green-200' : 'bg-red-200'}`}
      />
    </View>
  )
}
