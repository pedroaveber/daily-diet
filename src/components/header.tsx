import { View, Image } from 'react-native'
import LogoPng from '@assets/logo.png'

export function Header() {
  return (
    <View className="flex-row items-center justify-between">
      <Image source={LogoPng} alt="" />

      <Image
        className="border rounded-full box-border object-cover"
        style={{ width: 40, height: 40 }}
        source={{ uri: 'https://github.com/pedroalbertoveber.png' }}
        alt=""
      />
    </View>
  )
}
