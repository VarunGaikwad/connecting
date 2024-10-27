import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import RegularText from '@/components/RegularText';
import BoldText from '@/components/BoldText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { setStringAsync } from 'expo-clipboard';
import { styles } from '@/styles/sheet';

export default function Setting() {
    const { user } = useUser();
    return (
        <View style={{ padding: 20 }}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
            }}>
                <View>
                    <BoldText style={{ fontSize: 18 }}>{user?.firstName} {user?.lastName}</BoldText>
                    <RegularText>{user?.emailAddresses[0].emailAddress}</RegularText>
                </View>
                <Image source={{ uri: user?.imageUrl || "" }} style={{ width: 50, height: 50, borderRadius: 10 }} />
            </View>
            <View style={{ marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <BoldText>{user?.id}</BoldText>
                <Ionicons onPress={() => setStringAsync(user?.id!)} name="copy" size={20} color={Colors.primary} />
            </View>

            <View style={{ marginTop: 50 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
                    <TouchableOpacity style={styles.userCells}>
                        <Ionicons name="add-circle" size={30} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.userCells}>
                    <Image style={{
                        width: 50,
                        height: 50,
                    }} source={require("../../../assets/images/icon.png")} />
                    <BoldText>Varun Gaikwad</BoldText>
                </View>
            </View>
        </View >
    )
}
