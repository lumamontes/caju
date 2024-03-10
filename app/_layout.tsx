import { Stack } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
      <Stack
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  );
}
