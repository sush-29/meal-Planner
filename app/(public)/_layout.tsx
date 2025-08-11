import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#27ae60', // Green color for the header
        },
        headerTintColor: '#fff', // White color for header text
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Welcome to Meal Planner', // Updated title for a welcoming feel
        }} />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Create Your Account', // More engaging title
        }} />
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: 'Reset Your Password', // Clearer title for the reset screen
        }} />
    </Stack>
  );
};

export default PublicLayout;