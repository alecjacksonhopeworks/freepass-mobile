import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GlobalTheme } from '@constants/global-themes'; 
import {FreepassLogoImage} from '@components/Images'; 
import { useAuthStore } from '@db/store/useAuthStore';
import { Redirect } from 'expo-router';

const SplashScreen = () => {

    const authIsLoading = useAuthStore((store) => store.authIsLoading)

    if (!authIsLoading)
        return <Redirect href="/login"/>

    return (
        <View style={[styles.container, { backgroundColor: GlobalTheme.colors.primary}]}>
            <FreepassLogoImage size={100}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SplashScreen;
