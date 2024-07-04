import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function LoginScreen({navigation}:any) {
  return (
    <View>
      <Text>LoginScreen</Text>
      <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('BottomTab')}>
        <View >
          <Text style={{fontSize:15, marginHorizontal:20}}>INGRESAR</Text> 
        </View>      
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('Registro')}>
        <View >
          <Text style={{fontSize:15, marginHorizontal:20}}>RGISTRARSE</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btn:{
    backgroundColor:'#c8b9b1f7',
    borderRadius:40,
    height:20,
    width:'60%',
    alignItems:'center',
    justifyContent:'center'
  },
})