const USER_LOGIN = 'USER_LOGIN';
const userLogin = user => ({
    type: USER_LOGIN,
    user
});

const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
});



export const tryLogin = ({ email, password }) => dispatch => {
    
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