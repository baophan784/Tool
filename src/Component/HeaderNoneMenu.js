import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useContext } from 'react';
import { Text, View,StyleSheet, Platform } from "react-native";
import { AuthContext } from '../Context/AuthContext';

function HeaderNoneMenu() {
    let {xu} = useContext(AuthContext);

    return ( 
    <View style={style.parentContainer}>
      
          <Text style={style.xu}>
              Tổng Xu: {xu}
          </Text>
      
    </View>);
}
const style = StyleSheet.create({
parentContainer: {
        width: '80%', // Đảm bảo parentContainer chiếm toàn bộ chiều rộng của màn hình
        marginLeft: Platform.OS === 'android' ? '18%' : 0,
        padding: 10, // Thêm padding để phần tử con không bị chạm sát cạnh màn hình
    },
    xu: {
        alignSelf: 'flex-end', // Đặt phần tử xu ở bên phải
      
        fontSize: 18,
        
    },
});

export default HeaderNoneMenu;