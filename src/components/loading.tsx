import { ActivityIndicator, View } from 'react-native'
import { green } from 'tailwindcss/colors'

export function Loading() {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center">
      <ActivityIndicator color={green[700]} size={32} />
    </View>
  )
}
