import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet, Platform } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    color: string;
}

export function Button( { title, color, ...rest }:ButtonProps ){
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: color}]} activeOpacity={0.7} {...rest}
        >
            <Text style={styles.buttonText}>
              {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: Platform.OS == 'ios' ? 15 : 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
})