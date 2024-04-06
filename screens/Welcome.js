import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Buttons';

const Welcome = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                <View>

                    <Image
                        source={require("../assets/rpetreg.png")}
                        style={{
                            height: 200,
                            width: 237,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 30,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                // { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>


                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white,
                        left:70
                    }}>Welcome </Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.white,
                        left:140
                    }}>To</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.white,
                        left:65
                    }}>REPTINFO</Text>

                    <View style={{ marginVertical: 22 }}>
                      
    
                    </View>

                    <Button
                        title="Join Now"
                        //onPress={() => navigation.navigate("Signup")}
                        onPress={() => navigation.navigate("Notifications")}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white
                        }}>Already have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome