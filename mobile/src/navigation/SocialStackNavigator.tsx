import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SocialStackParamList } from "../types";

// Social Screens
import SocialFeedScreen from "../screens/SocialFeedScreen";
import FriendsScreen from "../screens/FriendsScreen";
import ChallengesScreen from "../screens/ChallengesScreen";

const Stack = createNativeStackNavigator<SocialStackParamList>();

export default function SocialStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0d0f1a",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
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
