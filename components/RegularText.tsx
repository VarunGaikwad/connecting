import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'

export default function RegularText({ children, style, ...props }: TextProps) {
    return (
        <Text {...props} style={[styles.text, style]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins",
    },
});
