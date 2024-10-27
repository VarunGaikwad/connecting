import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import RegularText from '@/components/RegularText'
import BoldText from '@/components/BoldText'
import AntDesign from '@expo/vector-icons/AntDesign';
import { styles } from '@/styles/sheet'
import { Colors } from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter(),
        { startOAuthFlow } = useOAuth({ strategy: "oauth_google" }),
        onGoogleLogin = async () => {
            try {
                const { createdSessionId } = await startOAuthFlow();
                if (createdSessionId) {
                    console.log("Successfully signed in:", createdSessionId);
                    router.replace("/auth");
                } else {
                    console.log("Sign-in was not completed");
                }
            } catch (error) {
                console.log(error);
            }
        };
    return (
        <View style={styles.unauthContainer}>
            <BoldText style={{ fontSize: 24 }}>Sign In connecting</BoldText>
            <RegularText style={{ fontSize: 16, color: "gray" }}>Welcome to back! Please sign in to continue.</RegularText>
            <View style={{ width: "80%" }}>
                <TouchableOpacity onPress={onGoogleLogin} style={styles.googleButton}>
                    <AntDesign name="google" size={24} color={Colors.secondary} />
                    <RegularText style={{ fontSize: 18, color: Colors.secondary }}>Sign In</RegularText>
                </TouchableOpacity>
            </View>
        </View>
    )
}
