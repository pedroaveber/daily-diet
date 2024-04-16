import { Text, TextInput, TextInputProps, View } from 'react-native'

interface TextearaProps extends TextInputProps {
  label: string
}

export function Textarea({ label, ...props }: TextearaProps) {
  return (
    <View className="w-full items-start gap-2 mb-3">
      <Text className="text-sm font-nunito-bold text-gray-950">{label}</Text>

      <TextInput
        {...props}
        multiline
        numberOfLines={4}
        className="w-full min-h-[120px] max-h-[120px] p-4 border border-gray-200 rounded-md"
      />
    </View>
  )
}
