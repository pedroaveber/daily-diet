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
        id: string
      }
      'edit-meal': {
        id: string
      }
    }
  }
}
