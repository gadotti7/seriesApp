import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import LoginScreen from './pages/LoginScreen';
import SeriesScreen from './pages/SeriesScreen';
import SerieDetailsScreen from './pages/SerieDetailsScreen';
import SerieFormScreen from './pages/SerieFormScreen';

const AppNavigator = createStackNavigator({
  'Login': { 
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
  Main: {
    screen: SeriesScreen
  },
  'SerieFormScreen': {
    screen: SerieFormScreen,
    navigationOptions: {
      title: 'Nova Série'
    }
  },
  'SerieDetailsScreen': {
    screen: SerieDetailsScreen,
    navigationOptions: ({ navigation }) => {
      const { serie } = navigation.state.params;
      return {
        title: serie.title
      }
    },
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
    }
  }
});

export default createAppContainer(AppNavigator);