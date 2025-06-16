import { View, StyleSheet, Text, Alert} from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormatedDate } from "../../util/date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {

    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString(): '',
        date: defaultValues ? getFormatedDate(defaultValues.date): '',
        description: defaultValues ? defaultValues.description.toString(): '',
    });

    function inputChangedHandler(inputIndentifier, enteredValue) {
        const newValue = 
            inputIndentifier === "amount" ? enteredValue.replace(",", ".") : enteredValue
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIndentifier]: newValue
            };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        };
        
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsvalid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsvalid || !descriptionIsValid) {
            Alert.alert("Invalid inputs", "Please check your input values!");
        }

        onSubmit(expenseData)
    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input 
                style={styles.rowInput}
                label="Amount"  
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputValues.amount
                }}
            />
            <Input 
                style={styles.rowInput}
                label="Date" 
                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputValues.date
                }}
            />
        </View>
        <Input 
            label="Description" 
            textInputConfig={{
                multiline: true,
                // autoCapitalize: 'none',
                // autoCorrect: false
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputValues.description
            }}
        />
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