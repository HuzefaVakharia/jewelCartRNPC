import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button,Alert, Image,PermissionsAndroid,TouchableOpacity,Dimensions } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';

import { I18n } from "i18n-js";

let { height, width } = Dimensions.get('window');

//let singleFileButArray=[];


//export default function CameraFullScreen({navigation,props }) {
  export default function CameraFullScreen(props) {     
  const route = useRoute();
 /* const { 
   
   accessTokenSentToCameraFullScreen,
   itemImageSentToCameraFullScreen,
   orderIDSentToCameraFullScreen,
    cameraOpenedFromScreen,

    openFullScreenCameraForSameOrder,

   orderDateSentToCameraFullScreen,
    nameSentToCameraFullScreen,
    categorynameSentToCameraFullScreen,
    typeOfOrderSentToCameraFullScreen,

     customerIDSentToCameraFullScreen,
    supplierIDSentToCameraFullScreen,
    categoryIDSentToCameraFullScreen,



    itemNameSentToCameraFullScreen,
    qtySentToCameraFullScreen,
    sizeSentToCameraFullScreen,
    narrationSentToCameraFullScreen,
    deliveryDateSentToCameraFullScreen,
    prioritySentToCameraFullScreen,
    designNoSentToCameraFullScreen,
    broadnessSentToCameraFullScreen,
    diamondweightSentToCameraFullScreen,
    diamondqualitySentToCameraFullScreen,
    diamondpcsSentToCameraFullScreen,
    partydiamondSentToCameraFullScreen,
    stoneweightSentToCameraFullScreen,
    stonequalitySentToCameraFullScreen,
    stonepcsSentToCameraFullScreen,
    partystoneSentToCameraFullScreen,
    ptpolishSentToCameraFullScreen,
    kt18polishSentToCameraFullScreen,
    engravingdetailsSentToCameraFullScreen,
    orderforSentToCameraFullScreen,
    suppliernameSentToCameraFullScreen,
    hallmarkSentToCameraFullScreen,
    arrayOfimagesSentToCameraFullScreen,
   
   
   
   
   } = route.params; */
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [singleFile, setSingleFile] = useState(null);
const [singleFileTwo, setSingleFileTwo] = useState('');

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);





  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });


      //openDocumentPickerToSelectSavedImage();
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  
  
  const checkPermissions = async () => {
    try {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      if (!result) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title:
              'You need to give storage permission to download and save the file',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          return true;
        } else {
          Alert.alert('Error', I18n.t('PERMISSION_ACCESS_FILE'));

          console.log('Camera permission denied');
          return false;
        }
      } else {
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };



 /*  const gotoEditOrderScreenFirst = () =>
 {
   navigation.navigate('EditOrderScreen', {
   accessTokenSentToEditOrder:accessTokenSentToCameraFullScreen,
   arrayOfimagesCapturedUsingCamera: singleFileButArray,
     itemImage:itemImageSentToCameraFullScreen,
     orderIDSentToEditOrder:orderIDSentToCameraFullScreen,


    orderDateSentFromOrderScreen:orderDateSentToCameraFullScreen,
    nameToBeEditedForEditOrder:nameSentToCameraFullScreen,
    categorynameReceivedFromOrderScreen:categorynameSentToCameraFullScreen,
    typeOfOrderFromOrderScreen:typeOfOrderSentToCameraFullScreen,

     customerIDSentToEditOrder:customerIDSentToCameraFullScreen,
    supplierIDSentToEditOrder:supplierIDSentToCameraFullScreen,
    categoryIDSentToEditOrder:categoryIDSentToCameraFullScreen,



    itemNameReceivedFromOrderScreen:itemNameSentToCameraFullScreen,
    qtyReceivedFromOrderScreen:qtySentToCameraFullScreen,
    sizeReceivedFromOrderScreen:sizeSentToCameraFullScreen,
    narrationReceivedFromOrderScreen:narrationSentToCameraFullScreen,
    deliveryDateReceivedFromOrderScreen:deliveryDateSentToCameraFullScreen,
    priorityReceivedFromOrderScreen:prioritySentToCameraFullScreen,
    designNoReceivedFromOrderScreen:designNoSentToCameraFullScreen,
    broadnessReceivedFromOrderScreen:broadnessSentToCameraFullScreen,
    diamondweightReceivedFromOrderScreen:diamondweightSentToCameraFullScreen,
    diamondqualityReceivedFromOrderScreen:diamondqualitySentToCameraFullScreen,
    diamondpcsReceivedFromOrderScreen:diamondpcsSentToCameraFullScreen,
    partydiamondReceivedFromOrderScreen:partydiamondSentToCameraFullScreen,
    stoneweightReceivedFromOrderScreen:stoneweightSentToCameraFullScreen,
    stonequalityReceivedFromOrderScreen:stonequalitySentToCameraFullScreen,
    stonepcsReceivedFromOrderScreen:stonepcsSentToCameraFullScreen,
    partystoneReceivedFromOrderScreen:partystoneSentToCameraFullScreen,
    ptpolishReceivedFromOrderScreen:ptpolishSentToCameraFullScreen,
    kt18polishReceivedFromOrderScreen:kt18polishSentToCameraFullScreen,
    engravingdetailsReceivedFromOrderScreen:engravingdetailsSentToCameraFullScreen,
    orderforFromOrderScreenReceivedFromOrderScreen:orderforSentToCameraFullScreen,
    suppliernameReceivedFromOrderScreen:suppliernameSentToCameraFullScreen,
    hallmarkReceivedFromOrderScreen:hallmarkSentToCameraFullScreen,
    

    

     
   
  }); 
  
 };



 const gotoAddOrderScreenFirst = () =>
 {
   navigation.navigate('AddOrderScreen', {
   accessTokenSentToAddOrderScreen:accessTokenSentToCameraFullScreen,
   arrayOfimagesCapturedUsingCamera: singleFileButArray,
   openFullScreenCameraForSameOrderKey:openFullScreenCameraForSameOrder,
     

     
   
  }); 
  
 }; */
  
  
  async function selectFile() {
    alert('Select File Clicked...');
    /* Below we will make singleFileButArray=[]; so that singleFileButArray get empty for every new Image selected. */
    //singleFileButArray=[];
   /* if(openFullScreenCameraForSameOrder!='Yes'){
     singleFileButArray=[];     
   } */
   
        
    try {
      const result = await checkPermissions();

      if (result) {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: false,
          type: 'image/*',
        });

        if (result.type === 'success') {
          // Printing the log realted to the file
          console.log('res : ' + JSON.stringify(result));
          //alert('res : ' + JSON.stringify(result));  
          // Setting the state to show single file attributes
          
          

        


          //singleFileButArray.push(result);

          props.singleFileButArrayProps.push(result);   

            props.openFullScreenCameraTrueOrFalseProps(false);
          //alert('Value in openFullScreenCameraTrueOrFalseProps is: '+props.openFullScreenCameraTrueOrFalseProps);  



          /* if(cameraOpenedFromScreen=='AddOrderScreen'){gotoAddOrderScreenFirst();}
          else{gotoEditOrderScreenFirst();} */
          
          
          
          
          //gotoEditOrderScreenFirst();
          

          
             
          


/* Due to putting our selected image inside this below given two useStates our full UI tags are getting refresh and so our FlatList is also getting refreshed and we can see one by one selected images on screen after getting our flatlist refresed. So do not think that these useStates are not used anywhere in the code, so why we keep it here, it is only to refresh our Flatlist when we select new images from our Document picker.  */
            
            
          setSingleFile(result);
          setSingleFileTwo(result); 
            
            
            
/*             
          props.openFullScreenCameraTrueOrFalseProps(false);
          alert('Value in openFullScreenCameraTrueOrFalseProps is: '+props.openFullScreenCameraTrueOrFalseProps); */       
        
        
        
        
        }
      }
    } catch (err) {
      setSingleFile(null);
      console.warn("This is the warning: ",err);
      return false;
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        
        <Button title="Take Pic" onPress={takePic} />

        <Button title="Upload Pic" onPress={selectFile} />

         {/* <Button title="Open First Screen" onPress={()=>{props.openFullScreenCameraTrueOrFalseProps(false);}} /> */}   

      { /*  <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity> */}


      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:height,
    width:width,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});
