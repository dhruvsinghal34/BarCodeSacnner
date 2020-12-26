import * as React from 'react';
import { Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      hasCameraPermissions: null,
      scanned:false,
      sacnnedData:'',
      buttonState:'normal',
   }
  }
  
  getCameraPermissions = async ()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      /* status === "granted" is true when users has granted Permissions 
         status === "granted" is false when users has not granted permissions 
       */
      hasCameraPermissions:status === 'granted',
    })
  }

  handleBarCodeScanned = async ({type,data}) =>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal',
    })
  }

render(){
  const hasCameraPermissions = this.state.hasCameraPermissions;
  const scanned = this.state.scanned;
  const buttonState = this.state.buttonState;
  if (buttonState === "clicked" && hasCameraPermissions){
    return(
<BarCodeScanner
onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
></BarCodeScanner>
    )}

  else if (buttonState === "normal"){
return (
    <View style={styles.container}>
<Text style={styles.displayText}>{hasCameraPermissions === true ?this.state.sacnnedData:"Request Camera Permissions"}</Text>
      <TouchableOpacity 
      style={styles.button}
      onPress={this.getCameraPermissions}>
      <Text>Scan QR Code </Text>
      </TouchableOpacity>
    </View>
)}}}

const styles = StyleSheet.create({
  container :{
    flex:1,
    justifyContent:'center',
    alignItems: "center"
  },
  displayText:{
    fontSize:15,
    textDecorationLine:'underline'
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 30,
    background: 'blue',
  },
})