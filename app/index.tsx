import React, { useEffect, useRef } from 'react';
import { View, Animated, Image, Easing } from 'react-native';
import { styles } from '@/styles/sheet';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function Index() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const time = 1000;


  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 2.5,
      duration: time,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (isSignedIn) {
        router.replace("/auth");
      } else {
        router.replace("/unauth");
      }
    });
  }, [isSignedIn]);

  return (
    <View style={styles.loadingContainer}>
      <Animated.Image
        style={[styles.loadingImage, { transform: [{ scale: scaleValue }] }]}
        source={require('../assets/images/icon.png')}
      />
    </View>
  );
}
