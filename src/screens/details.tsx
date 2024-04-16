import { PercentageHighlight } from '@components/percentage-highlight'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { TouchableOpacity, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { green, red } from 'tailwindcss/colors'

export function Details() {
  const percentage = 54.65
  const navigation = useNavigation()

  function handleGoBackHome() {
    navigation.navigate('home')
  }

  return (
    <SafeAreaView
      className={`flex-1 pt-6 -mb-8 ${percentage >= 60 ? 'bg-green-50' : 'bg-red-50'}`}
    >
      <TouchableOpacity onPress={handleGoBackHome} className="w-full p-6">
        <ArrowLeft size={24} color={percentage >= 60 ? green[700] : red[700]} />
      </TouchableOpacity>

      <View className="w-full -mt-8 pb-8 items-center justify-center">
        <PercentageHighlight percentage={percentage} />
      </View>

      <View className="flex-1 bg-white rounded-t-[20px] p-6">
        <Text className="text-base mb-6 text-center font-nunito-bold text-gray-950">
          Estatíscas gerais
        </Text>

        <View className="w-full p-4 mb-2 items-center justify-center rounded-lg bg-gray-200">
          <Text className="text-2xl font-nunito-bold text-gray-950">4</Text>
          <Text className="text-base font-nunito text-gray-800 text-center">
            melhor sequência de pratos dentro da dieta
          </Text>
        </View>

        <View className="w-full p-4 mb-2 items-center justify-center rounded-lg bg-gray-200">
          <Text className="text-2xl font-nunito-bold text-gray-950">109</Text>
          <Text className="text-base font-nunito text-gray-800 text-center">
            Refeiçoes registradas
          </Text>
        </View>

        <View className="w-full flex flex-row box-border">
          <View className="w-1/2 pr-0.5">
            <View className="w-full p-4 mr-1 mb-2 items-center justify-center rounded-lg bg-green-50">
              <Text className="text-2xl font-nunito-bold text-gray-950">
                32
              </Text>
              <Text className="text-base font-nunito text-gray-800 text-center">
                refeições dentro da dieta
              </Text>
            </View>
          </View>

          <View className="w-1/2 pl-0.5">
            <View className="w-full ml-1 p-4 mb-2 items-center justify-center rounded-lg bg-red-50">
              <Text className="text-2xl font-nunito-bold text-gray-950">
                77
              </Text>
              <Text className="text-base font-nunito text-gray-800 text-center">
                refeições fora da dieta
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
