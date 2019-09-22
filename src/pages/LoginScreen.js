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
import { connect } from 'react-redux'
import { tryLogin } from '../actions';

import FormRow from '../components/FormRow';

class LoginPage extends React.Component {
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
        const { email, password } = this.state;

        this.props.tryLogin({ email, password })
            .then(user  => {
                if (user)
                    return this.props.navigation.replace('Main');

                this.setState({ 
                    isLoading: false,
                    message: ' '
                });
            })
            .catch( error => {
                this.setState({ 
                    isLoading: false,
                    message: this.getMessageByErrorCode(error.code)
                });
            });
    }

    getMessageByErrorCode(errorCode){
        switch(errorCode){
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/invalid-email':
                return 'E-mail inválido'
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
                        keyboardType="email-address"
                        autoCapitalize="none"
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

export default connect(null, { tryLogin })(LoginPage)