export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      details: undefined
      'new-meal': undefined
      'meal-created': {
        healthly: boolean
      }
      'meal-details': {
        date: string
        name: string
      }
      'edit-meal': {
        date: string
        name: string
      }
    }
  }
}
