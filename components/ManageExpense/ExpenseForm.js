import { View } from "react-native";
import Input from "./Input";

function ExpenseForm() {

    function amountchangedHandler() {}

    return <View>
        <Input 
            label="Amount"  
            textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountchangedHandler,
            }}
        />
        <Input 
            label="Date" 
            textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLength: 10,
                onChangeText: () => {}
            }}
        />
        <Input 
            label="Description" 
            textInputConfig={{
                multiline: true,
                // autoCapitalize: 'none',
                // autoCorrect: false
            }}
        />
    </View>
}

export default ExpenseForm;