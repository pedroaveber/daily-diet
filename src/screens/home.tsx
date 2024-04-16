import { SectionList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@components/header'
import { DietResume } from '@components/diet-resume'
import { Button } from '@components/button'
import { format, parseISO } from 'date-fns'
import { Meal } from '@components/meal'
import { useNavigation } from '@react-navigation/native'

const fakeData = [
  {
    title: '2024-01-01',
    data: [
      {
        hour: '08:00',
        name: 'Ovos mexidos com abacate',
        onDiet: true,
      },
      {
        hour: '12:00',
        name: 'Batata frita e bife a milanesa',
        onDiet: false,
      },
      {
        hour: '15:00',
        name: 'Batida de banana e whey',
        onDiet: true,
      },
    ],
  },
  {
    title: '2024-01-02',
    data: [
      {
        hour: '08:00',
        name: 'Biscoitos waffer e Nescau',
        onDiet: false,
      },
      {
        hour: '12:00',
        name: 'Arroz, feijão e bife',
        onDiet: true,
      },
      {
        hour: '15:00',
        name: 'Iogurte natural com granola',
        onDiet: true,
      },
    ],
  },
]

export function Home() {
  const navigation = useNavigation()

  function handleNavigateToNewMeal() {
    navigation.navigate('new-meal')
  }

  return (
    <SafeAreaView className="flex-1 p-6 bg-zinc-50">
      <Header />

      <DietResume percentage={87.65} />

      <View className="w-full items-start gap-2">
        <Text className="font-nunito text-gray-950 text-base">Refeições</Text>

        <Button
          onPress={handleNavigateToNewMeal}
          activeOpacity={0.85}
          icon="plus"
          content="Nova refeição"
        />
      </View>

      <SectionList
        className="mt-8"
        sections={fakeData}
        keyExtractor={(_, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <Text className="font-nunito-bold text-gray-950 text-lg mb-2">
              {format(parseISO(title), 'dd.MM.yy')}
            </Text>
          )
        }}
        renderItem={({ item }) => {
          return <Meal hour={item.hour} name={item.name} onDiet={item.onDiet} />
        }}
      />
    </SafeAreaView>
  )
}
