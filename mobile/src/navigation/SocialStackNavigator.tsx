import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SocialStackParamList } from "../types";

// Social Screens
import SocialFeedScreen from "../screens/SocialFeedScreen";
import FriendsScreen from "../screens/FriendsScreen";
import ChallengesScreen from "../screens/ChallengesScreen";

const Stack = createStackNavigator<SocialStackParamList>();

export default function SocialStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#333",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="SocialFeed"
        component={SocialFeedScreen}
        options={{
          title: "Social Feed",
          headerRight: () => null, // Can add a create post button here later
        }}
      />
      <Stack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          title: "Friends",
        }}
      />
      <Stack.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          title: "Challenges",
        }}
      />
    </Stack.Navigator>
  );
}
