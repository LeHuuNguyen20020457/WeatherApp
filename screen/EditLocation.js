import React, { useRef, useState, useEffect, useMemo, startTransition, useLayoutEffect, Suspense, lazy } from 'react';
import { View, ActivityIndicator, Animated } from 'react-native';
import { matchSorter } from 'match-sorter';
import { db } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

import { SearchResults } from '../module/searchResults';
// const SearchResults = lazy(() => import('../module/searchResults/SearchResults'));
// const SearchResults = lazy(() => {
//     return new Promise((resolve) => {
//         console.log('vào');
//         setTimeout(() => {
//             resolve(import('../module/searchResults/SearchResults'));
//         }, 1000);
//     });
// });

import { SearchResultsLine } from '../components/searchResultsLine';

import { Input } from '../module/input';

const EditLocation = ({ route }) => {
    const [keySearch, setKeySearch] = useState(''); // từ search
    const [searchResults, setSearchResults] = useState(); // danh sách các địa điểm
    const [showResultsSearch, setShowResultsSearch] = useState(true);
    const [loading, setLoading] = useState(false);

    const cityList = useRef();
    const cityListSearch = useRef();

    const { isChangeWidth } = route.params;

    useEffect(() => {
        const data = require('../public/city.list.json');
        cityList.current = JSON.parse(JSON.stringify(data));
    }, []);

    // lấy các địa điểm đã lưu
    useLayoutEffect(() => {
        async function getData() {
            await getDocs(collection(db, 'weatherLocation')).then((snapshot) => {
                let data = [];
                snapshot.docs.forEach((doc) => {
                    // data =[{id, city, list}]
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setSearchResults(data);
                setLoading(true);
            });
        }
        getData();
    }, [showResultsSearch]);

    //search theo từ
    useMemo(() => {
        if (cityList.current) {
            const city = matchSorter(cityList.current, keySearch, {
                keys: ['name', 'name_with_type'],
                threshold: matchSorter.rankings.NO_MATCH,
                keepDiacritics: true,
            }).slice(0, 5);
            cityListSearch.current = city;
        }
    }, [keySearch]);

    return (
        <View>
            <Input setKeySearch={setKeySearch} keySearch={keySearch}></Input>

            {!keySearch ? (
                <ScrollView>
                    <View style={{ marginTop: 10 }}>
                        {loading ? (
                            searchResults?.map((weatherForEachLocation, index) => {
                                return (
                                    <SearchResults
                                        key={index}
                                        index={index}
                                        weatherForEachLocation={weatherForEachLocation}
                                        isChangeWidth={isChangeWidth}
                                    ></SearchResults>
                                );
                            })
                        ) : (
                            <ActivityIndicator />
                        )}
                    </View>
                </ScrollView>
            ) : (
                <ScrollView>
                    <View style={{ borderTopWidth: 1, borderColor: 'white', marginTop: 20 }}>
                        {cityListSearch.current.map((city, index) => {
                            return (
                                <SearchResultsLine
                                    key={index}
                                    city={city}
                                    setShowResultsSearch={setShowResultsSearch}
                                    showResultsSearch={showResultsSearch}
                                    setKeySearch={setKeySearch}
                                    setLoading={setLoading}
                                    loading={loading}
                                ></SearchResultsLine>
                            );
                        })}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default React.memo(EditLocation);
