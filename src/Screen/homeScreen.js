import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

function HomeScreen({ navigation }) {
    const { sanh,isLoading } = useContext(AuthContext);
    const [parsedSanh, setParsedSanh] = useState([]);

    useEffect(() => {
        if (sanh && sanh.length > 0) {
            setParsedSanh(JSON.parse(sanh)); // Parse the stringified JSON to an array
        }
    }, [sanh]);

    // Function to chunk the array into smaller arrays of size 2
    const chunkArray = (arr, size) => {
        return arr.reduce((acc, _, i) => {
            if (i % size === 0) {
                acc.push(arr.slice(i, i + size));
            }
            return acc;
        }, []);
    };

    // Function to handle press on a company
    const handleSanhPress = (sanh) => {
        // Navigate to the 'Game' screen and pass the selected company as a parameter
        navigation.navigate('Game', { sanh });
    };

    return ( 
        <View style={styles.container}>
        <Spinner visible={isLoading}/>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.heading}>Sảnh</Text>
                {Array.isArray(parsedSanh) ? (
                    // Chunk the array into smaller arrays of size 2
                    chunkArray(parsedSanh, 2).map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map(company => (
                                <TouchableOpacity
                                    key={company.id}
                                    style={styles.companyWrapper}
                                    onPress={() => handleSanhPress(company)}>
                                    <View style={styles.companyContainer}>
                                        <Image style={styles.logo} source={{ uri: company.logo }} />
                                        <Text style={styles.companyName}>{company.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))
                ) : (
                    <Text style={styles.loadingText}>Loading...</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Màu xám nhạt cho container
    },
    contentContainer: {
        alignItems: 'center',

        paddingBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Màu đen xám cho tiêu đề
        margin: 10,
        
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    companyWrapper: {
        width: '45%',
    },
    companyContainer: {
        backgroundColor: '#CCCCCC', // Màu đen cho companyContainer
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        margin: 10,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    companyName: {
        fontSize: 18,
        color: '#fff', // Màu trắng cho tên công ty
    },
    loadingText: {
        fontSize: 18,
        color: '#333', // Màu đen xám cho văn bản loading
    },
});

export default HomeScreen;
