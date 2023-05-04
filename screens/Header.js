import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Logo from './my-logo.png';

const Header = () => {
    return (
        <View>
            <Image source={Logo} style={styles.logo} />
        </View>
    )
}
const styles = StyleSheet.create({

    logo: {
        width: 200,
        height: 40,
        marginRight: `auto`,
        padding: 10,

    },
})

export default Header

