import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from './Header';
const COINBASE_API_ENDPOINT = 'https://api.coinbase.com/v2/exchange-rates';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CurrencyConverterScreen = () => {
    const [currencyRates, setCurrencyRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState('BTC');
    const [toCurrency, setToCurrency] = useState('USD');
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    useEffect(() => {
        fetchCurrencyRates();
    }, [fromCurrency]);

    const fetchCurrencyRates = async () => {
        const response = await fetch(`${COINBASE_API_ENDPOINT}?currency=${fromCurrency}`);
        const data = await response.json();
        setCurrencyRates(data.data.rates);
    };

    const handleConvert = () => {
        const rate = currencyRates[toCurrency];
        setToValue(fromValue * rate);
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.picker}>
                <Picker
                    selectedValue={fromCurrency}
                    onValueChange={value => setFromCurrency(value)}
                    style={{ flex: 1, color: "white", backgroundColor: '#0d0d32', borderRadius: 25, }}
                >
                    <Picker.Item label="Bitcoin (BTC)" value="BTC" />
                    <Picker.Item label="Ethereum (ETH)" value="ETH" />
                    <Picker.Item label="Binance Coin (BNB)" value="BNB" />
                    <Picker.Item label="Litecoin (LTC)" value="LTC" />
                    <Picker.Item label="Cardano (ADA)" value="ADA" />
                    <Picker.Item label="Dogecoin (DOGE)" value="DOGE" />
                    <Picker.Item label="Ripple (XRP)" value="XRP" />
                    <Picker.Item label="US Dollar (USD)" value="USD" />
                    <Picker.Item label="Euro (EUR)" value="EUR" />
                    <Picker.Item label="British Pound (GBP)" value="GBP" />
                    <Picker.Item label="Canadian Dollar (CAD)" value="CAD" />
                    <Picker.Item label="Turkish Lira (TRY)" value="TRY" />
                    <Picker.Item label="Japanese Yen (JPY)" value="JPY" />
                    <Picker.Item label="Swiss Franc (CHF)" value="CHF" />

                </Picker>
                <Picker
                    selectedValue={toCurrency}
                    onValueChange={value => setToCurrency(value)}
                    style={{ flex: 1, marginLeft: 10, color: "white", backgroundColor: '#0d0d32', borderRadius: 15, }}
                >
                    <Picker.Item label="US Dollar (USD)" value="USD" />
                    <Picker.Item label="Euro (EUR)" value="EUR" />
                    <Picker.Item label="British Pound (GBP)" value="GBP" />
                    <Picker.Item label="Canadian Dollar (CAD)" value="CAD" />
                    <Picker.Item label="Turkish Lira (TRY)" value="TRY" />
                    <Picker.Item label="Japanese Yen (JPY)" value="JPY" />
                    <Picker.Item label="Swiss Franc (CHF)" value="CHF" />
                    <Picker.Item label="Bitcoin (BTC)" value="BTC" />
                    <Picker.Item label="Ethereum (ETH)" value="ETH" />
                    <Picker.Item label="Binance Coin (BNB)" value="BNB" />
                    <Picker.Item label="Litecoin (LTC)" value="LTC" />
                    <Picker.Item label="Cardano (ADA)" value="ADA" />
                    <Picker.Item label="Dogecoin (DOGE)" value="DOGE" />
                    <Picker.Item label="Ripple (XRP)" value="XRP" />
                </Picker>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TextInput
                    placeholderTextColor={`#949598`}
                    value={fromValue}
                    maxLength={7}
                    onChangeText={setFromValue}
                    placeholder={`Enter ${fromCurrency} value`}
                    style={{ padding: 10, borderWidth: 1, flex: 1, borderColor: `white`, fontSize: 17, color: "white", color: "white" }}
                />
                <TextInput
                    placeholderTextColor={`#949598`}
                    editable={false}
                    maxLength={12}
                    value={toValue.toString()}
                    placeholder={`${toCurrency} value`}
                    style={{ padding: 10, borderWidth: 1, flex: 1, marginLeft: 10, borderColor: `white`, fontSize: 17, color: "white" }}
                />
            </View>
            <TouchableOpacity onPress={handleConvert} style={{ marginTop: 10, backgroundColor: 'blue', padding: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Convert</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0.05 * screenWidth,
        flex: 1,
        paddingTop: 0,
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#0d0d1e',
    },

    picker: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',

    },
    pickerStyle: {
        flex: 1,
        marginLeft: 10,
        color: "white",
        backgroundColor: '#0d0d32',
        borderRadius: 15,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        flex: 1,
        borderColor: 'white',
        fontSize: 17,
        color: "white",
        borderRadius: 5,
        textAlign: 'center',
    },
    convertButton: {
        marginTop: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center',
    },
    convertButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default CurrencyConverterScreen;
