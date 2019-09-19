import React from 'react';
import { 
    View, 
    TextInput,
    StyleSheet,
    Button,
    ActivityIndicator,
    Text,
    Alert
} from 'react-native';
import firebase from 'firebase';

import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: '',
        }
    }

    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyCCZnn2ns2owETXWWSiio2fQJu3mXEVrG4",
            authDomain: "seriesapp-2c78e.firebaseapp.com",
            databaseURL: "https://seriesapp-2c78e.firebaseio.com",
            projectId: "seriesapp-2c78e",
            storageBucket: "",
            messagingSenderId: "708491302982",
            appId: "1:708491302982:web:c9d02e011b7459146f5247"
        };
        firebase.initializeApp(firebaseConfig);

    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
         });
    }

    tryLogin(){
        this.setState({ isLoading: true, message: ''});
        const {email, password} = this.state

        const loginUserSucess = user => {
            this.setState({message: 'Sucesso!'});
        }
        
        const loginUserFailed = error => {
            this.setState({message: this.getMessageByErrorCode(error.code) });
        }
        
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(loginUserSucess)
            .catch( error => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar um cadastro com as informações inseridas?',
                        [{
                            text: 'Não',
                            style: 'cancel' //IOS
                        }, {
                            text: 'Sim',
                            onPress: () => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(email, password)
                                    .then(loginUserSucess)
                                    .catch(loginUserFailed)
                            }
                        }],
                        { cancelable : false }
                    )
                    return;
                }
                    loginUserFailed(error)
            })
            .then(() => this.setState({ isLoading: false }));
    }

    getMessageByErrorCode(errorCode){
        switch(errorCode){
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            default:
                return 'Erro desconhecido';
        }
    }

    renderMessager() {
        const { message } = this.state;
        if (!message)
            return null;

        return (
            <View>
                <Text>{message}</Text>
            </View>
        )
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator/>
               
        return(
            <Button 
                    title="Entrar"
                    color= '#9d00ff'
                    onPress={() => this.tryLogin()}/>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <FormRow first>
                    <TextInput style={styles.input}
                        placeholder="user@email.com" 
                        value={this.state.email}  
                        onChangeText={ value => this.onChangeHandler('email',value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput style={styles.input}
                        placeholder="*******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={ value => this.onChangeHandler('password',value)}
                    />
                </FormRow>

                { this.renderButton() }
                { this.renderMessager() }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingLeft: 10,
      paddingRight: 10,  
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
    }
});