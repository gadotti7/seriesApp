import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import LoginScreen from './src/pages/LoginScreen';

const AppNavigator = createStackNavigator({
  'Login': { 
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
}, {
  defaultNavigationOptions: {
    title: "Series",
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor: '#9d00ff',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
      flexGrow: 1,
      textAlign: 'center',
    }
  }
});

export default createAppContainer(AppNavigator);