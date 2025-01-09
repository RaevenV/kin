import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import home, { RootStackParamList } from "./home";
import Calendar from "./calendar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Profile from "./profile";
import TopicGenerator from "./topicGenerator";
import DailyQuestion from "./dailyQuestion";
import { createStackNavigator } from "@react-navigation/stack";

interface TabIconProps {
  icon: any|null;
  focused: boolean|null;
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

const TabIcon4 = ({ icon, focused }: TabIconProps) => {
  return (
    <View className="items-center flex flex-col justify-center gap-2">
      <FontAwesome
        color={focused ? "#77AAFF" : "#8f8989"}
        size={24}
        name={icon}
      />
    </View>
  );
};

const EmptyTabIcon = () => <></>;
const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={home} />
    <Stack.Screen name="DailyQuestion" component={DailyQuestion} />
    <Stack.Screen name="TopicGenerator" component={TopicGenerator} />
  </Stack.Navigator>
);


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
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "#77AAFF" : "#8f8989"}
            />
          ),
        }}
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

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon4 icon={"user"} focused={focused} />
          ),
        }}
        component={Profile}
      />
    </Tabs.Navigator>
  );
};

export default _layout;

const styles = StyleSheet.create({});
