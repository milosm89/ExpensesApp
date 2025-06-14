import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({route, navigation}) {

    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const editedExpenseDescription = route.params?.description;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandle() {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId,
                {
                    description: 'Test123',
                    amount: 29.99,
                    date: new Date('2025-02-19'),
                }
            );
        }else {
            expensesCtx.addExpense({
                description: 'Test',
                amount: 19.99,
                date: new Date('2025-03-18'),
            });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing? 'Update' : 'Add'}
                </Button>
            </View>
          {isEditing && (
            <View style={styles.deleteContainer}>
                <IconButton
                    icon='trash'
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={deleteExpenseHandle}
                />
            </View>
          )}
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
});