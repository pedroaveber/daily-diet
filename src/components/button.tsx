import { Text, TouchableOpacityProps, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from 'tailwindcss/colors'

const buttonVariants = {
  primary: 'bg-gray-800',
  outline: 'bg-transparent border border-gray-950',
}

interface ButtonProps extends TouchableOpacityProps {
  content: string
  icon?: keyof typeof MaterialCommunityIcons.glyphMap
  variant?: keyof typeof buttonVariants
}

export function Button({
  variant = 'primary',
  content,
  icon,
  ...props
}: ButtonProps) {
  // should not override the className prop
  delete props.className

  return (
    <TouchableOpacity
      className={`min-h-[50px] px-4 justify-center items-center rounded-md max-h-[50px] w-full flex flex-row box-border ${buttonVariants[variant]}`}
      {...props}
    >
      {icon && (
        <MaterialCommunityIcons
          style={{ marginRight: 3 }}
          color={white}
          size={24}
          name={icon}
        />
      )}
      <Text className="font-nunito-bold text-center text-white text-base">
        {content}
      </Text>
    </TouchableOpacity>
  )
}
