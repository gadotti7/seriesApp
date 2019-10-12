import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import LoginPage from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

const AppNavigator = createStackNavigator({
    'Login': {
        screen: LoginPage,
        navigationOptions: {
            title: 'Bem vindo!',
        }
    },
    'Main': {
        screen: SeriesPage
    },
    'SerieForm': {
        screen: SerieFormPage,
        navigationOptions: ({ navigation }) => {
            if (navigation.state.params && navigation.state.params.serieToEdit) {
                return {
                    title: navigation.state.params.serieToEdit.title,
                }
            }
            return {
                title: 'Nova série',
            };
        }
    },
    'SerieDetail': {
        screen: SerieDetailPage,
        navigationOptions: ({ navigation }) => {
            const { serie } = navigation.state.params;
            return {
                title: serie.title
            }
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
    }
  }
});

export default createAppContainer(AppNavigator);