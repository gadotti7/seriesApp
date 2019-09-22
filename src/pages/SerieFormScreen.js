import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Slider, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import FormRow from '../components/FormRow';
import { setField, saveSerie } from '../actions';

const SerieFormScreen = ({ serieForm, setField, saveSerie}) => (
    <KeyboardAvoidingView 
        keyboardVerticalOffset={250}
        behavior="padding"
        enabled>
        <ScrollView>
            {/* TITULO */}
            <FormRow first>
                <TextInput
                    style={styles.input}
                    placeholder="Título" 
                    value={serieForm.title}
                    onChangeText={value => setField('title', value)}
                />
            </FormRow>
            
            {/* URL */}
            <FormRow>
                <TextInput
                    style={styles.input}
                    placeholder="URL da Imagem" 
                    value={serieForm.img}
                    onChangeText={value => setField('img', value)}
                />
            </FormRow>
        
            {/* COMBO */}
            <FormRow>
                <Picker
                    selectedValue={serieForm.gender}
                    onValueChange={ itemValue => {
                        setField('gender', itemValue)
                    }}>

                    <Picker.Item label="Policial" value="police" />
                    <Picker.Item label="Comédia" value="comedy" />
                    <Picker.Item label="Terror" value="horror" />
                </Picker>
            </FormRow>


            {/* NOTA */}
            <FormRow>
                <View style={styles.sameRow}>
                    <Text>Nota:</Text>
                    <Text>{serieForm.rate}</Text>
                </View>
                <Slider 
                    onValueChange = {value => setField('rate', value)}
                    value={serieForm.rate}
                    maximumValue={100}
                    step={5}
                />
            </FormRow>

            {/* DESCRIÇÃO */}
            <FormRow last>
                <TextInput
                    style={styles.input}
                    placeholder="Descrição" 
                    value={serieForm.description}
                    onChangeText={value => setField('description', value)}
                    numberOfLines={4}
                    multiline={true}
                />
            </FormRow>

            <Button
                title="Salvar"
                onPress={() => saveSerie(serieForm)} />

        </ScrollView>
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    }
})

function mapStateToProps(state){
    return{
        serieForm: state.serieForm
    }
}

const mapDispatchToProps = {
    setField,
    saveSerie
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormScreen);  
