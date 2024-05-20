import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function RateBar({ visible, item }) {
    return (
        <View style={styles.container}>
            {visible ? (
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${item}%`, backgroundColor: item < 50 ? 'red' : 'green' }]}>
                        <Text style={styles.progressText}>Tỷ lệ {item} %</Text>
                    </View>
                </View>
            ) : (
                <Text style={styles.rate}>Tỷ lệ đang ẩn</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    progressBarContainer: {
        height: 20,
        width: '100%',
        backgroundColor: '#e0e0df',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        justifyContent: 'center',
        borderRadius: 5,
    },
    progressText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    rate: {
        fontSize: 18,
        color: 'black',
    },
});

export default RateBar;
