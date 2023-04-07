import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { db } from '../../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { scrollHorizontalContext } from '../../config/ThemeContext';

const SearchResultsLine = ({ city, setShowResultsSearch, showResultsSearch, setKeySearch, setLoading }) => {
    // const [scrollHorizontal, setScrollHorizontal, setIndex, reloadData, setReloadData] =
    //     useContext(scrollHorizontalContext);

    const { reloadData, setReloadData } = useContext(scrollHorizontalContext);

    const handleSelect = () => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=1f6ee6321c963bedf422d26c3ac3f1cd&units=metric&cnt=40&lang=vi`,
            )
            .then(async (weatherCity) => {
                await addDoc(collection(db, 'weatherLocation'), {
                    list: weatherCity.data.list,
                    city: weatherCity.data.city,
                });
                setLoading(false);
                setShowResultsSearch(!showResultsSearch);
                setKeySearch('');
                setReloadData(!reloadData);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <TouchableOpacity onPress={handleSelect}>
            <View style={styles.containerLine}>
                <Text style={styles.city}>{city.name}</Text>
                <Text style={styles.country}>{city.name}/Việt Nam</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        marginLeft: 10,
        zIndex: 5,
    },
    city: {
        color: 'white',
        fontSize: 18,
        letterSpacing: 1,
    },
    country: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        marginLeft: 28,
    },
});

export default React.memo(SearchResultsLine);
