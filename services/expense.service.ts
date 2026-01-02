/**
 * 💰 EXPENSE SERVICE
 * ==================
 * Logic untuk fitur expense tracker
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Transaction, Budget, MonthlyFinance, ExpenseCategory } from "@/types";
import { APP_CONFIG } from "@/config";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "@expense";

// Get monthly finance data
export async function getMonthlyFinance(month: string): Promise<MonthlyFinance> {
  try {
    const data = await AsyncStorage.getItem(`${STORAGE_KEY}_${month}`);
    if (data) {
      return JSON.parse(data);
    }
    return createEmptyMonthlyFinance(month);
  } catch (error) {
    console.error("Error getting monthly finance:", error);
    return createEmptyMonthlyFinance(month);
  }
}

// Save monthly finance
export async function saveMonthlyFinance(finance: MonthlyFinance): Promise<void> {
  try {
    await AsyncStorage.setItem(
      `${STORAGE_KEY}_${finance.month}`,
      JSON.stringify(finance)
    );
  } catch (error) {
    console.error("Error saving monthly finance:", error);
  }
}

// Add a transaction
export async function addTransaction(
  month: string,
  transaction: Omit<Transaction, "id">
): Promise<MonthlyFinance> {
  const finance = await getMonthlyFinance(month);

  const newTransaction: Transaction = {
    ...transaction,
    id: generateId(),
  };

  finance.transactions.push(newTransaction);

  // Recalculate totals
  recalculateTotals(finance);

  await saveMonthlyFinance(finance);
  return finance;
}

// Remove a transaction
export async function removeTransaction(
  month: string,
  transactionId: string
): Promise<MonthlyFinance> {
  const finance = await getMonthlyFinance(month);
  finance.transactions = finance.transactions.filter((t) => t.id !== transactionId);

  recalculateTotals(finance);

  await saveMonthlyFinance(finance);
  return finance;
}

// Set budget for a category
export async function setBudget(
  month: string,
  category: ExpenseCategory,
  limit: number
): Promise<MonthlyFinance> {
  const finance = await getMonthlyFinance(month);

  const existingBudget = finance.budgets.find((b) => b.category === category);
  if (existingBudget) {
    existingBudget.limit = limit;
  } else {
    finance.budgets.push({ category, limit, spent: 0 });
  }

  recalculateTotals(finance);

  await saveMonthlyFinance(finance);
  return finance;
}

// Get transactions by category
export function getTransactionsByCategory(
  finance: MonthlyFinance,
  category: ExpenseCategory
): Transaction[] {
  return finance.transactions.filter((t) => t.category === category);
}

// Recalculate totals
function recalculateTotals(finance: MonthlyFinance): void {
  finance.income = finance.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  finance.expense = finance.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Update budget spent amounts
  finance.budgets.forEach((budget) => {
    budget.spent = finance.transactions
      .filter((t) => t.type === "expense" && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
  });
}

// Create empty monthly finance
function createEmptyMonthlyFinance(month: string): MonthlyFinance {
  return {
    month,
    income: 0,
    expense: 0,
    transactions: [],
    budgets: [],
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  return `${APP_CONFIG.expense.currencySymbol} ${amount.toLocaleString("id-ID")}`;
}
