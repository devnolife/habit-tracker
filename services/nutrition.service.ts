/**
 * 🍎 NUTRITION SERVICE
 * ====================
 * Logic untuk fitur nutrition tracker
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Meal, DailyNutrition, MealType } from "@/types";
import { APP_CONFIG } from "@/config";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "@nutrition";

// Get nutrition data for a specific date
export async function getDailyNutrition(date: string): Promise<DailyNutrition> {
  try {
    const data = await AsyncStorage.getItem(`${STORAGE_KEY}_${date}`);
    if (data) {
      return JSON.parse(data);
    }
    return createEmptyNutrition(date);
  } catch (error) {
    console.error("Error getting nutrition:", error);
    return createEmptyNutrition(date);
  }
}

// Save nutrition data
export async function saveDailyNutrition(nutrition: DailyNutrition): Promise<void> {
  try {
    await AsyncStorage.setItem(
      `${STORAGE_KEY}_${nutrition.date}`,
      JSON.stringify(nutrition)
    );
  } catch (error) {
    console.error("Error saving nutrition:", error);
  }
}

// Add a meal
export async function addMeal(date: string, meal: Omit<Meal, "id" | "date">): Promise<DailyNutrition> {
  const nutrition = await getDailyNutrition(date);
  const newMeal: Meal = {
    ...meal,
    id: generateId(),
    date,
  };

  nutrition.meals.push(newMeal);
  nutrition.totalCalories = nutrition.meals.reduce((sum, m) => sum + m.calories, 0);

  await saveDailyNutrition(nutrition);
  return nutrition;
}

// Remove a meal
export async function removeMeal(date: string, mealId: string): Promise<DailyNutrition> {
  const nutrition = await getDailyNutrition(date);
  nutrition.meals = nutrition.meals.filter((m) => m.id !== mealId);
  nutrition.totalCalories = nutrition.meals.reduce((sum, m) => sum + m.calories, 0);

  await saveDailyNutrition(nutrition);
  return nutrition;
}

// Update calorie goal
export async function updateCalorieGoal(date: string, goal: number): Promise<void> {
  const nutrition = await getDailyNutrition(date);
  nutrition.goal = goal;
  await saveDailyNutrition(nutrition);
}

// Create empty nutrition object
function createEmptyNutrition(date: string): DailyNutrition {
  return {
    date,
    meals: [],
    totalCalories: 0,
    goal: APP_CONFIG.nutrition.defaultCalorieGoal,
  };
}
