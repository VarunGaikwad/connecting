import { Colors } from '@/constants/Colors';
import { GlobalContextType, useGlobal } from '@/libs/context';
import { supabase } from '@/libs/supabase';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { styles } from '@/styles/sheet';

const LOCATION_TASK_NAME = 'background-location-task',
    onRequestPermissions = async () => {
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus === 'granted') {
            const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
            if (backgroundStatus === 'granted') {
                await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 10000,
                    distanceInterval: 50,
                    foregroundService: {
                        notificationTitle: 'Tracking your location',
                        notificationBody: 'We are tracking your location in the background',
                    },
                }).then(() => {
                    console.log("Location updates started");
                }).catch((error) => {
                    console.error("Error starting location updates:", error);
                });

            }
        }
    };


export default function TabLayout() {
    const { user } = useUser();
    const { setLocalModel } = useGlobal() as GlobalContextType;

    useEffect(() => {
        const fetchOrCreateUserInfo = async () => {
            if (!user) return;

            const { data, error } = await supabase.from('UserInfo').select('*').eq('id', user.id),
                payload = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailAddress: user.emailAddresses[0].emailAddress,
                    imageUrl: user.imageUrl,
                    watching: [].join(","),
                }

            if (data?.length === 0) {
                try {
                    await supabase.from("UserInfo").insert(payload);

                    setLocalModel && setLocalModel((prev: any) => ({
                        ...prev,
                        userInfo: payload,
                    }));
                } catch (error) {
                    console.error("Error creating user info:", error);
                }
            } else {
                const userInfo = data?.[0];
                userInfo.watching = userInfo.watching.split(",").filter((item: string) => item !== "");

                setLocalModel && setLocalModel((prev: any) => ({
                    ...prev,
                    userInfo,
                }));
            }

            onRequestPermissions();
        };
        fetchOrCreateUserInfo();
    }, [user]);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.grey,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.label,
                tabBarIconStyle: styles.icon,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            size={28}
                            name={focused ? 'home' : 'home-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            size={28}
                            name={focused ? 'settings' : 'settings-outline'}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        return;
    }
    if (data) {
        const { locations } = data as any;
    }
});

