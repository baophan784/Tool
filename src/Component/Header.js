import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useContext } from 'react';
import { Text, View,StyleSheet } from "react-native";
import { AuthContext } from '../Context/AuthContext';

function Header() {
    let {xu} = useContext(AuthContext);

    return ( 
    <View style={style.container}>
        <View style={style.menu}>
            <SimpleLineIcons name="menu" size={24} color="black" />
        </View>
        <Text style={style.xu}>
            Tổng Xu: {xu}
        </Text>
    </View> );
}
const style = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'end',
  },

  xu: {
    marginRight: 40,
    fontStyle: 'bold',
    fontSize: 18,  
  },
})
export default Header;