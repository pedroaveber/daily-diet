import { Text, TextInput, TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
  label: string
}

export function Input({ label, ...props }: InputProps) {
  return (
    <View className="w-full items-start gap-2 mb-3">
      <Text className="text-sm font-nunito-bold text-gray-950">{label}</Text>

      <TextInput
        {...props}
        className="w-full box-border px-4 min-h-[48px] max-h-[48px] border border-gray-200 rounded-md"
      />
    </View>
  )
}
