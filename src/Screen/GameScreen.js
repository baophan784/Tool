import { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, FlatList, Image,Keyboard } from 'react-native'; // Import Image component
import { AuthContext } from '../Context/AuthContext';
import { useRoute,useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import RateBar from '../Component/RateBar';

function GameScreen() {
    const route = useRoute(); // Hook to access the route object
    const { sanh } = route.params || {}; 
    const [accountName, setAccountName] = useState('');
    const { game, getGame, visible,setVisibel ,getAccount,isLoading} = useContext(AuthContext);

useEffect(() => {
    getGame(sanh.id);
    const interval = setInterval(() => {
        if(visible){
            getGame(sanh.id);
            console.log('loaded game list')
        }
    }, 1000); // 10 giây

    return () => {clearInterval(interval);
        
    };
}, [sanh,visible]);

useFocusEffect(
        useCallback(() => {
            // Screen is focused
            return () => {
                // Screen is unfocused
                setVisibel(false);
            };
        }, [])
    );
    const cancel = () =>{
        Alert.alert('Xác nhận dừng','Tỷ lệ sẽ bị ẩn đi, để lấy tỷ lệ mới sẽ tốn 1 xu',
        [
        {
        text: 'Để sau',
        },
        {
            text: 'OK',
            onPress: ()=>setVisibel(false), // Gọi hàm openTelegram khi nhấn OK
        },
        ],
        { cancelable: true }
    )
    };
    return ( 
        <View style={styles.container}>
        <Spinner visible={isLoading}/>
            {sanh ? (
                <>
                    <View style={styles.containerControl}>
                        <Text style={styles.text}>{sanh.name}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={styles.textInput} 
                                placeholder='Nhập tên tài khoản đã liên kết'
                                value={accountName}
                                onChangeText={setAccountName}
                            />
                            {visible?(
                                <TouchableOpacity
                                style={[styles.loginButton,{backgroundColor:'red'}]}
                                onPress={() => {
                                     cancel()}}
                            >
                                <Text style={styles.buttonText}>Dừng soi</Text>
                            </TouchableOpacity>
                            ):(
                                <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => {
                                     Keyboard.dismiss();
                                     getAccount(accountName)}}
                            >
                                <Text style={styles.buttonText}>Soi</Text>
                            </TouchableOpacity>
                            )}
                            
                        </View>
                    </View>
                    <View style={styles.gameList}>
                        <FlatList
                            data={game}
                            
                            renderItem={({ item }) => (
                                <View style={styles.gameItem}>
                                    <Image style={styles.logo} source={{ uri: item.logo }} /> 
                                    <View style={styles.info}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        {/* {visible?(<Text style={[styles.rate, { color: item.value < 50 ? 'red' : 'green' }]}>Tỷ lệ {item.value} %</Text>):(<Text style={[styles.rate]}>Tỷ lệ đang ẩn</Text>)} */}
                                        <RateBar visible={visible} item={item.value}/>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                        />

                    </View>
                </>
            ) : (
                <Text style={styles.text}>Vui lòng chọn sảnh...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    containerControl: {
        paddingTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 0,
        height: 40,
        marginRight: 10,
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        height: 40,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    gameList: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    gameItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rate: {
        fontSize: 16,
        color: 'gray',
    },
});

export default GameScreen;
