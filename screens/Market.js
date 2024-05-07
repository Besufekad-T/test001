import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Pressable } from 'react-native';
import COLORS from '../constants/colors';
import TabNavigation from '../navigation/TabNavigation';

export default function Market({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header with logo and profile icon */}
            <View style={styles.header}>
                {/*<Image source={require('../assets/logo.png')} style={styles.logo}/>*/}
                <Text style={styles.headerTitle}>Reptile Marketplace</Text>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                    {/*<Image source={require('../assets/profile-icon.png')} style={styles.profileIcon} />*/}
                </Pressable>
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Search for reptile products"
                    style={styles.searchInput}
                />
            </View>
            
            {/* Main content area */}
            <ScrollView style={styles.mainContent}>
                <Text style={styles.welcomeText}>Welcome to the Reptile Marketplace</Text>
                {/* Rest of your marketplace UI components */}
            </ScrollView>
            
            {/* Tab Navigation */}
            <TabNavigation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: COLORS.primary,
    },
    logo: {
        width: 40,
        height: 40,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.lightText,
    },
    profileIcon: {
        width: 30,
        height: 30,
    },
    searchBar: {
        margin: 10,
        padding: 5,
        borderRadius: 20,
        backgroundColor: COLORS.light,
    },
    searchInput: {
        padding: 10,
    },
    mainContent: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    // Add other styles here for the rest of your components
});

// You will need to replace '../assets/logo.png' and '../assets/profile-icon.png' with your actual local images
// COLORS should be defined in your 'constants/colors' file
