import { useNavigation } from '@react-navigation/native'
import { ArrowUpRight } from 'phosphor-react-native'
import { TouchableOpacity, View } from 'react-native'
import { green, red } from 'tailwindcss/colors'
import { PercentageHighlight } from './percentage-highlight'

interface DietResumeProps {
  percentage: number
}

export function DietResume({ percentage }: DietResumeProps) {
  const navigation = useNavigation()

  const defaultGoal = 60
  const isAboveGoal = percentage >= defaultGoal

  function handleNavigateToDetails() {
    navigation.navigate('details')
  }

  return (
    <View
      className={`my-8 items-center justify-center w-full h-[102px] rounded-lg relative ${isAboveGoal ? 'bg-green-50' : 'bg-red-50'}`}
    >
      <PercentageHighlight percentage={percentage} />

      <TouchableOpacity
        onPress={handleNavigateToDetails}
        className="absolute right-2 top-2"
      >
        <ArrowUpRight color={isAboveGoal ? green[700] : red[700]} size={24} />
      </TouchableOpacity>
    </View>
  )
}
