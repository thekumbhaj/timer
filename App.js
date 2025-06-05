import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TimerProvider } from './src/context/TimerContext';
import { ThemeProvider } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import AddTimerScreen from './src/screens/AddTimerScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Timers' }} />
            <Stack.Screen name="AddTimer" component={AddTimerScreen} options={{ title: 'Add New Timer' }} />
            <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Timer History' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </TimerProvider>
    </ThemeProvider>
  );
}