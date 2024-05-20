import { child } from "firebase/database";
import { auth } from "../../firebaseConfig";
import {signInWithEmailAndPassword } from "firebase/auth";
import { 
Alert,Linking
} from 'react-native';
import React , {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { app } from "../../firebaseConfig";
import { getDatabase, ref,onValue,update } from "firebase/database";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [sanh, setSanh] = useState({})
    const [game, setGame] = useState({});
    const [xu, setXu] = useState(0);
    const [visible, setVisibel] = useState(false);

    const db = getDatabase(app);
    useEffect (() => {
        getSanh();
    }, []);

    const login = (user, pass,nav)=>{
        setIsLoading(true)
        if(user==null){
            Alert.alert("Vui lòng nhập tên tài khoản...")
            setIsLoading(false);
            return;
        }
        if(pass==null){
                    Alert.alert("Vui lòng nhập mật khẩu...")
                    setIsLoading(false);
                    return;
                }
        signInWithEmailAndPassword(auth, user.concat('@gmail.com'), pass)
                .then((userCredential) => {
                    const user_Info = userCredential.user;
                    setUserInfo(user_Info);
                    AsyncStorage.setItem('userInfo', JSON.stringify(user_Info));
                    
                    getXu(user)
                                       
                    nav.navigate('Home');
                    setIsLoading(false);
                })
                .catch((error) => {
                Alert.alert("Sai tên tài khoản hoặc mật khẩu...")
                setIsLoading(false);
                });
    }

    const getSanh = () =>{
        setIsLoading(true)
        axios
        .get('https://www.helpslot.win/api/companys?requestFrom=H5')
        .then((response) => {
            
            setSanh(JSON.stringify(response.data.data));
            setIsLoading(false)
        })
        .catch((err) => {
        setIsLoading(false)
        });
    }

    const getGame = (id) =>{
        
        axios.get(`https://www.helpslot.win/api/games?companyId=${id}&search=&requestFrom=H5`)
        .then((response) =>{
            setGame(response.data.data);
            
        })
        .catch((err) =>{
            
        });
    }
    const getXu = (username) => {
        try{
        setIsLoading(true);
        const lowerCaseUsername = username.toLowerCase();  
        const dbRef = ref(db, `userInfo/${lowerCaseUsername}`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            setXu(data.luot)
            setIsLoading(false);
        });
        }catch(e) {
            setIsLoading(false);
            thongBao();
    }}


    const getAccount = (acc) =>{
        try {
            setIsLoading(true)
            if(xu<=0){
                setIsLoading(false)
                thongBaoHetXu();
                return;
            }
            if(visible){
                setIsLoading(false)
                Alert.alert('Tỷ lệ đã được soi, thử lại sau 10 phút...');
                return;
            }
            if(acc.length == 0){
                setIsLoading(false)
                Alert.alert('Chưa nhập tên tài khoản....');
                return;
            }

            const dbRef = ref(db, 'Account');
            onValue(dbRef, (snapshot) => {
            const accounts = snapshot.val();
            if (accounts) {
                const lowercaseAcc = acc.toLowerCase(); // Chuyển hết chuỗi tìm kiếm thành chữ thường
                const found = Object.keys(accounts).find(key => key.toLowerCase() === lowercaseAcc);
                if (found) {
                    setVisibel(true);
                    const newXu = xu - 1;
                    setXu(newXu);
                    
                     truXu(found,newXu)

                    setTimeout(() => {
                        setVisibel(false);
                    }, 300000);
                    setIsLoading(false)
                } else {
                setIsLoading(false)
                Alert.alert('Tài khoản chưa được kích hoạt');
                }
            } else {
                setIsLoading(false)
                Alert.alert('Không tìm thấy tài khoản');
            }
            });
        }
        catch(err){
            setIsLoading(false)
           thongBao();

        }
    }
    const truXu=(user,newLuot)=>{
        try{
            setIsLoading(true)
            const lowerCaseUsername = user.toLowerCase();  
                    const dbRef = ref(db, `userInfo/${lowerCaseUsername}`);
                    update(dbRef, { luot: newLuot })
                    .then(() => {
                        console.log('Xu updated successfully');
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        console.error('Error updating xu:', error);
                        setIsLoading(false)
                        thongBao(); // Hiển thị thông báo nếu có lỗi xảy ra
                    });
        }
        catch (e) {
        console.error('Error fetching xu:', e);
        setIsLoading(false)
        thongBao(); // Hiển thị thông báo nếu có lỗi xảy ra
    }
        
    };

    const openTelegram = () => {
    const url = 'https://t.me/nicca256';
    Linking.canOpenURL(url)
        .then((supported) => {
        if (supported) {
            return Linking.openURL(url);
        } else {
            console.log("Don't know how to open URI: " + url);
        }
        })
        .catch((err) => console.error('An error occurred', err));
    };
    const thongBaoHetXu = () =>{
        Alert.alert('Thông báo','Tài khoản đã hết xu, vui lòng liên hệ Telegram @nicca256',
        [
        {
        text: 'Để sau',
        onPress: () => console.log('Để sau pressed'), // Không thực hiện hành động gì
        },
        {
            text: 'OK',
            onPress: openTelegram, // Gọi hàm openTelegram khi nhấn OK
        },
        ],
        { cancelable: true }
    )
    }

    const thongBao = () =>{
        Alert.alert('Thông báo','Tài khoản chưa được kích hoạt vui lòng liên hệ Telegram @nicca256',
        [
        {
        text: 'Để sau',
        onPress: () => console.log('Để sau pressed'), // Không thực hiện hành động gì
        },
        {
            text: 'OK',
            onPress: openTelegram, // Gọi hàm openTelegram khi nhấn OK
        },
        ],
        { cancelable: true }
    )
    }

    return (<AuthContext.Provider value={{getAccount,visible,xu,game,getGame, sanh,isLoading,userInfo,login,setVisibel}}>
        {children}
    </AuthContext.Provider>)
}