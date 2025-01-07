import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import home from "./home";
import DailyQuestion from "./dailyQuestion";
import Calendar from "./calendar";
import TopicGenerator from "./topicGenerator";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface TabIconProps {
  icon: any;
  focused: boolean;
}

const TabIcon = ({ icon, focused }: TabIconProps) => {
  return (
    <View className="items-center flex flex-col justify-center gap-2">
      <Ionicons color={focused ? "#77AAFF" : "#8f8989"} size={24} name={icon} />
    </View>
  );
};

const TabIcon2 = ({ icon, focused }: TabIconProps) => {
  return (
    <View className="items-center flex flex-col justify-center gap-2">
      <AntDesign color={focused ? "#77AAFF" : "#8f8989"} size={24} name={icon} />
    </View>
  );
};


const TabIcon3 = ({ icon, focused }: TabIconProps) => {
  return (
    <View className="items-center flex flex-col justify-center gap-2">
      <MaterialCommunityIcons
        color={focused ? "#77AAFF" : "#8f8989"}
        size={24}
        name={icon}
      />
    </View>
  );
};


const Tabs = createBottomTabNavigator();

const _layout = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#8f8989",
        tabBarActiveTintColor: "#f0e9e9",
        tabBarStyle: {
          backgroundColor: "#FEFEFE",
          paddingTop: 20,
          height: 90,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={"home"} focused={focused} />
          ),
        }}
        component={home}
      />
      <Tabs.Screen
        name="dailyQuestion"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon3 icon={"cards"} focused={focused} />
          ),
        }}
        component={DailyQuestion}
      />
      <Tabs.Screen
        name="topicGenerator"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={"dice-outline"} focused={focused} />
          ),
        }}
        component={TopicGenerator}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon2 icon={"calendar"} focused={focused} />
          ),
        }}
        component={Calendar}
      />

      
    </Tabs.Navigator>
  );
};

export default _layout;

const styles = StyleSheet.create({});
