import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

function ExpensesOutput({expenses, expensesPeriod}) {

    return (
        <>
            {expenses.length > 0 ?
            <View style={styles.container}>
                <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
                <ExpensesList expenses={expenses} /> 
            </View> 
            :
            <View style={[styles.container, styles.textWrap]}>
                <Text style={styles.text}>You no have recent expences in last 7 days!</Text>
            </View>
            }
        </>
        
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
    },
    textWrap: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16
    }
});