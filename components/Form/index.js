import react, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration} from "react-native";
import ResultIMC from "./ResultIMC/index";
import styles from "./style";

export default function Form(){

const [height, setHeight]= useState(null)
const [weight, setWeight]= useState(null)
const [messageImc, setMessageImc]= useState("preencha o peso e altura");
const [imc, setImc]= useState(null)
const [textButton, setTextButton]= useState("Calcular")
const [errorMessage, setErrorMessage] = useState(null)

function imcCalculator(){
    return setImc((weight/(height*height)).toFixed(2))
}

function verificationImc(){
    if (imc == null){
        Vibration.vibrate();
        setErrorMessage("campo obrigatório*")
    }
}

function validationImc(){
    if(weight != null && height != null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu imc é igual: ")
        setTextButton("Calcular Novamente")
        setErrorMessage(null)
        return
    }
    verificationImc()
    setImc(null)
    setTextButton("Calcular")
    setMessageImc("preencha o peso e altura")
}
    return(
        <View style = {styles.formContext}>
            <View style = {styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex. 1.75"
                keyboardType="numbers-and-punctuation"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 75.365"
                keyboardType="numbers-and-punctuation"
                />
                <TouchableOpacity 
                style={styles.ButtonCalculator}
                onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
                <ResultIMC messageResultImc={messageImc} resultImc={imc}/>
                </View>
        </View>
    );
}