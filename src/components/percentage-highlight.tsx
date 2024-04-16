import { Text } from 'react-native'

interface PercentageHighlightProps {
  percentage: number
}

export function PercentageHighlight({ percentage }: PercentageHighlightProps) {
  const percentageValue = percentage.toFixed(2).replace('.', ',')

  return (
    <>
      <Text className="text-center text-3xl font-nunito-bold">
        {percentageValue}%
      </Text>

      <Text className="text-sm text-gray-800">
        das refeições dentro da dieta
      </Text>
    </>
  )
}
