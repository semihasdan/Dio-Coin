import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, RefreshControl, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from './my-logo.png';
;

const List = ({ }) => {
    const [data, setData] = useState([]); // veri
    const [refreshing, setRefreshing] = useState(false); // Yenileme işlemi
    const [search, setSearch] = useState(''); // Arama



    // Verileri API'den almak için useEffect kullanıyoruz.
    useEffect(() => {
        const getData = () => {
            fetch('https://api.coincap.io/v2/assets', { method: 'GET' })
                .then((response) => response.json())
                .then((data) => setData(data.data))
                .catch((error) => console.log(error));
        };
        getData();
    }, []);

    // Ekranı aşağı çekildiğinde yenileme için kullanılır.
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 4000);
        fetch('https://api.coincap.io/v2/assets', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setData(data.data))
            .catch((error) => console.log(error));
    }, []);

    // Arama işlemini yönetir.
    const searchData = (text) => {
        setSearch(text);
    };

    // Arama sonuçlarını filtreleyerek verileri eşleştiriyoruz.
    const filteredData = data.filter((item) => {
        const itemData = item.name.toUpperCase();
        const searchData = search.toUpperCase();
        return itemData.indexOf(searchData) > -1;
    });


    return (
        <>
            <View style={styles.container}><View style={styles.tab}>
                <Image source={Logo} style={styles.logo} />
                <SearchBar searchData={searchData} /></View>
                <ScrollView style={styles.scroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                    {filteredData.map((item) => (
                        <View style={styles.divider} key={item.id}>
                            <View>
                                <Text style={styles.textsName}>{item.name} - </Text>
                                <Text style={[styles.change, item.changePercent24Hr < 0 ? styles.change : styles.changee]}>{parseFloat(item.changePercent24Hr).toFixed(2)}</Text>
                            </View>
                            <Text style={styles.textsSymbol}>{item.symbol} </Text>
                            <Text style={styles.textsPrice}>${parseFloat(item.priceUsd).toFixed(5)}</Text>

                        </View>
                    ))}
                </ScrollView>

            </View>
        </>
    );
};


const SearchBar = ({ searchData }) => {
    const [text, setText] = useState('');

    const handleSearch = (searchText) => {
        setText(searchText);
        searchData(searchText);
    };

    return (
        <View style={styles.search}>
            <MaterialCommunityIcons name="magnify" size={22} color="#e3e4e6" />
            <TextInput
                style={styles.input}
                placeholder="Search"
                value={text}
                onChangeText={handleSearch}
                autoCapitalize="none"
            />
        </View>
    );
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const searchBarWidth = screenWidth > 600 ? 300 : 150;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#0d0d1e',
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    logo: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.15,
        resizeMode: 'contain',
    },
    scroll: {
        width: screenWidth * 0.9,
        borderRadius: 53,
        paddingVertical: 0,
    },
    divider: {
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: screenHeight * 0.025,
        marginTop: 'auto',
    },
    textsName: {
        fontSize: screenHeight * 0.02,
        color: 'white',
    },
    textsPrice: {
        paddingStart: 30,
        color: 'white',
        marginLeft: 'auto',
        fontSize: screenHeight * 0.021,
    },
    textsSymbol: {
        color: '#737373',
        fontSize: screenHeight * 0.016,
        paddingTop: screenHeight * 0.002,
    },
    change: {
        color: '#ff2426',
        fontSize: screenHeight * 0.015,
    },
    changee: {
        color: '#37ff3d',
        fontSize: screenHeight * 0.015,
    },
    marketCup: {
        marginLeft: 'auto',
    },
    search: {
        backgroundColor: "#666666",
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#666666",
        marginTop: 5,
        height: 32,
        width: searchBarWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#b9b9b9',
        paddingBottom: 10,
        borderRadius: 15,
        paddingStart: 15,
        paddingBottom: 1,
        color: '#000000',
    },
});
export default List;
