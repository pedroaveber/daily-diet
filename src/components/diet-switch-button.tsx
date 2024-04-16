import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native'

export const dietSwitchButtonVariants = {
  positive: 'bg-green-50 border border-green-700',
  negative: 'bg-red-50 border border-red-700',
}

interface DietSwitchButton extends TouchableOpacityProps {
  label: string
  variant: keyof typeof dietSwitchButtonVariants
  isActive: boolean
}

export function DietSwitchButton({
  label,
  variant,
  isActive,
  ...props
}: DietSwitchButton) {
  return (
    <TouchableOpacity
      {...props}
      className={`w-full flex-row max-h-[50px] min-h-[50px] rounded-md items-center justify-center ${isActive ? dietSwitchButtonVariants[variant] : 'bg-gray-100'}`}
    >
      <View
        className={`w-2 h-2 rounded-full mr-2 ${variant === 'positive' ? 'bg-green-700' : 'bg-red-700'}`}
      />

      <Text className="text-base font-nunito-bold text-gray-950">{label}</Text>
    </TouchableOpacity>
  )
}
