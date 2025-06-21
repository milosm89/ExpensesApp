import { View, StyleSheet, Text, Alert} from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormatedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString(): '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormatedDate(defaultValues.date): '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description.toString(): '',
            isValid: true,
        },
    });

    function inputChangedHandler(inputIndentifier, enteredValue) {
        const newValue = 
            inputIndentifier === "amount" ? enteredValue.replace(",", ".") : enteredValue
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIndentifier]: {value: newValue, isValid: true}
            };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };
        
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert("Invalid inputs", "Please check your input values!");
            setInputs((curInputs) => {
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid},
                };
            });
            return
        }

        onSubmit(expenseData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
    

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input 
                style={styles.rowInput}
                label="Amount"  
                invalid = {!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }}
            />
            <Input 
                style={styles.rowInput}
                label="Date" 
                invalid = {!inputs.date.isValid}
                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }}
            />
        </View>
        <Input 
            label="Description" 
            invalid = {!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                // autoCapitalize: 'none',
                // autoCorrect: false
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value
            }}
        />
        {formIsInvalid && (<Text style={styles.errorText}>Invalid input values - please check your input data!</Text>)}
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>
                {submitButtonLabel}
            </Button>
        </View>
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
     buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
})