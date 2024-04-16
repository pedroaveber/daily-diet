import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import { useCallback, useState } from 'react'

import { Input } from '@components/input'
import { Button } from '@components/button'
import { Textarea } from '@components/textarea'

import { gray } from 'tailwindcss/colors'
import { ArrowLeft } from 'phosphor-react-native'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DietSwitchButton } from '@components/diet-switch-button'
import { AppError } from '@utils/errors/app-error'
import { getMealById } from '@storage/meals/get-meal-by-id'
import { Loading } from '@components/loading'
import { updateMeal } from '@storage/meals/update-meail'
import { format, parseISO } from 'date-fns'

interface RouteParams {
  id: string
}

export function EditMeal() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [isHealthly, setIsHealthly] = useState(true)
  const [description, setDescription] = useState('')

  const [isFetching, setIsFetching] = useState(true)

  const navigation = useNavigation()
  const router = useRoute()

  const { id: mealId } = router.params as RouteParams

  function handleGoBackHome() {
    navigation.navigate('home')
  }

  async function handleUpdateMeal() {
    const [day, month, year] = date.split('/')

    try {
      await updateMeal(
        {
          id,
          name,
          time,
          description,
          date: `${year}-${month}-${day}`,
          healthly: isHealthly,
        },
        id,
      )

      navigation.navigate('meal-created', { healthly: isHealthly })
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) {
        Alert.alert('Cadastrar refeição', error.message)
      } else {
        Alert.alert('Cadastrar refeição', 'Ocorreu um erro inesperado')
      }
    }
  }

  async function fetchMealDetails() {
    setIsFetching(true)

    try {
      const meal = await getMealById(mealId)

      setId(meal.id)
      setName(meal.name)
      setDate(format(parseISO(meal.date), 'dd/MM/yyyy'))
      setTime(meal.time)
      setIsHealthly(meal.healthly)
      setDescription(meal.description)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Detalhes da refeição', error.message)
        navigation.navigate('home')
      } else {
        Alert.alert('Detalhes da refeição', 'Ocorreu um erro inesperado')
      }
    } finally {
      setIsFetching(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMealDetails()
    }, []),
  )

  return isFetching ? (
    <Loading />
  ) : (
    <SafeAreaView className="flex-1 bg-gray-200 pt-6 -mb-8">
      <View className="w-full relative p-6 items-center flex-row justify-center">
        <TouchableOpacity
          className="absolute left-6"
          onPress={handleGoBackHome}
        >
          <ArrowLeft size={24} color={gray[950]} />
        </TouchableOpacity>

        <Text className="text-center font-nunito-bold text-gray-950 text-lg">
          Editar refeição
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1 bg-white rounded-t-[20px] p-6 pt-8"
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <Input value={name} onChangeText={setName} label="Nome" />

        <Textarea
          value={description}
          onChangeText={setDescription}
          label="Descrição"
        />

        <View className="w-full items-start flex-row">
          <View className="w-1/2 pr-1.5">
            <Input value={date} onChangeText={setDate} label="Data" />
          </View>

          <View className="w-1/2 pl-1.5">
            <Input value={time} onChangeText={setTime} label="Hora" />
          </View>
        </View>

        <View className="items-start flex-1 pb-6 mt-4 gap-2">
          <Text className="text-sm font-nunito-bold text-gray-950">
            Está dentro da dieta?
          </Text>
          <View className="w-full items-start flex-1 flex-row">
            <View className="w-1/2 pr-1.5">
              <DietSwitchButton
                isActive={isHealthly}
                label="Sim"
                onPress={() => setIsHealthly(true)}
                variant="positive"
                disabled={isHealthly}
              />
            </View>

            <View className="w-1/2 pl-1.5">
              <DietSwitchButton
                isActive={!isHealthly}
                label="Não"
                onPress={() => setIsHealthly(false)}
                variant="negative"
                disabled={!isHealthly}
              />
            </View>
          </View>

          <Button
            onPress={handleUpdateMeal}
            activeOpacity={0.85}
            content="Salvar alterações"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
