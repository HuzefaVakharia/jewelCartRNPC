import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  Text,
  
} from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AnimatedTextInputFile from '../components/AnimatedTextInputFile';
import AllUITogether from '../components/AllUITogether';
import FetchDynamicAPIs from '../components/FetchDynamicAPIs';
import { TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { Button, Card } from '@rneui/themed';

let { height, width } = Dimensions.get('window');

const EditColorScreen = ({navigation }) => {
const route = useRoute();
  let name = '',
    id = '',
    orderPerson = '',
    mobileNumber = '',
    orderPersonNumber = '',
    address = '',
    city = '',
    state = '';
    stateWithID='';
    cityWithID='';
    supplierCode='';

    const { 
    accessTokenSentToEditColorScreen,
    colornameToBeEdited,
    colorIDToBeEdited,
      caratIDToBeEdited,  
      previousScreenName, 
    } = route.params; 

  

//alert('Name of supplier is:'+name+'State name is:'+state+' State ID is:'+stateWithID+' City name is:'+city+' City ID is:'+cityWithID);

  //alert('Name got is:'+name);


  
  const [selectedCaratFromListInEditColorScreen, setselectedCaratFromListInEditColorScreen] = useState('Carat');
  let [selectedCaratIDInEditColorScreen, setselectedCaratIDInEditColorScreen] = useState(-1);


  const [selectedStateFromList, setselectedStateFromList] = useState('State');

  const [editsupplierScreenModal, setEditsupplierScreenModal] = useState(true);

  const [selectedCityFromList, setselectedCityFromList] = useState('City');

  const [callFetchDynamicAPIsInEditColorScreen,setcallFetchDynamicAPIsInEditColorScreen] = useState(false);

  const [createNewUserResultTrueOrFalse, setCreateNewUserResultTrueOrFalse] =
    useState(false);
  const [createNewUserResultInDigit, setCreateNewUserResultInDigit] =
    useState(0);
  const [createNewUserResultInText, setCreateNewUserResultInText] =
    useState('');

  const [secondRegisterModalVisible, setSecondRegisterModalVisible] =
    useState(true);

  const [searchTextInputForStateGotFocus, setSearchTextInputForStateGotFocus] =
    useState(false);
  const [searchTextInputForCityGotFocus, setSearchTextInputForCityGotFocus] =
    useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  //console.log(route.params.namePropslabel);
  let [fontsLoaded] = useFonts({
    'raleway-extraLight': require('../assets/fonts/Raleway-ExtraLight.ttf'),
    'raleway-light': require('../assets/fonts/Raleway-Light.ttf'),
    'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'raleway-medium': require('../assets/fonts/Raleway-Medium.ttf'),
    'raleway-black': require('../assets/fonts/Raleway-Black.ttf'),
  });

  const contactPersonNoTextInputRef = useRef();

  let [isUpdateProcessRunning, setIsUpdateProcessRunning] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        setSearchTextInputForStateGotFocus(true);
        setSearchTextInputForCityGotFocus(true);
        //fetchState();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
        setSearchTextInputForStateGotFocus(false);
        setSearchTextInputForCityGotFocus(false);
        //alert('Keyboard hided....')
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);


  

  let [colornameInEditColorScreen, setcolornameInEditColorScreen] = useState(colornameToBeEdited);

  

  

  const chkAllFieldsEnteredInEditColorScreen = () => {
    if (!colornameInEditColorScreen.trim()) {
      //alert('Please Enter Website');
      ToastAndroid.showWithGravity(
        'Please Enter Color Name',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setIsUpdateProcessRunning(false);
      return;
      
    }
    

    setcallFetchDynamicAPIsInEditColorScreen(true);
  };

  /*  useEffect(() => {
    alert(
      'supplierCodeToBeEdited got is:'+supplierCodeToBeEdited+'\n'+
      'supplierIDToBeEdited got is:'+supplierIDToBeEdited+'\n'
    );       
    
     //alert('Name of supplier is:'+colornameInEditColorScreen+'State name is:'+stateInEditColorScreen+' State ID is:'+stateIDInEditColorScreen+' City name is:'+cityInEditColorScreen+' City ID is:'+cityIDInEditColorScreen); 
  }, []);*/     

  const gotoColorScreen = () => {
    //alert('Btn clicked....');
     navigation.replace("ColorScreen", {     
      accessTokenSentToColorScreen: accessTokenSentToEditColorScreen,
      previousScreenName:previousScreenName    
    }); 
    //setEditsupplierScreenModal(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        <StatusBar backgroundColor="#283E65" barStyle={'light-content'} />

        {/* <AllUITogether show="ImageBackgroundWhichContainsChildren">
        </AllUITogether> */}

        <ImageBackground
          source={ require('../images/background.png') }
          resizeMode="cover"
          style={ {
           marginTop: responsiveHeight(-1),      

            //When using this code for making apk just uncomment this above marginTop:responsiveHeight(-5)
            //because this marginTop: responsiveHeight(-5), is perfect for VSCode but not perfect for
            //expo snake
            height: responsiveHeight(35),

            //marginBottom:responsiveHeight(-30),         
          } }/>

          


          {/*View which will hold back arrow image and ADD ORDER text starts here  */}
                <View style={{
                  
                  marginTop:responsiveHeight(-30),        
                  //backgroundColor:'purple',
                  }}>
                <View
                  style={{
                    marginTop: responsiveHeight(0),
                    marginLeft: responsiveWidth(-4),
                    //marginBottom: responsiveHeight(10),
                    marginBottom: responsiveHeight(0),    
                    //backgroundColor:'red',
                    flexDirection: 'row',                   
                  }}>
                  

                  <View
                    style={{
                      marginTop: responsiveHeight(0),
                      //backgroundColor:'cyan'
                    }}>
                    {/*<AllUITogether
                      show={'AntIconBtn'}
                      dothisProps={gotoColorScreen}   
                      iconDesignName={'left'}
                colorForIconinAntDesignBtn={'gold'}
                backgroundColorForIconinAntDesignBtn={'transparent'}
                sizeForIconinAntDesignBtn={26}
                boardRadiusForIconinAntDesignBtn={10}
                widthForIconinAntDesignBtn={11}
                heightForIconinAntDesignBtn={6}
                marginLeftForIconinAntDesignBtn={5}
                marginTopForIconinAntDesignBtn={0}
                boardColorForIconinAntDesignBtn={'transparent'}
                boardWidthForIconinAntDesignBtn={0}
                    />*/}
                    <AllUITogether
            show={'AntIconBtn'}
              //dothisProps={gotoSupplierScreen}    
            dothisProps={gotoColorScreen}
            iconDesignName={'left'}
            colorForIconinAntDesignBtn={'gold'}
            backgroundColorForIconinAntDesignBtn={'transparent'}
            sizeForIconinAntDesignBtn={26}
            boardRadiusForIconinAntDesignBtn={10}
            widthForIconinAntDesignBtn={responsiveWidth(11)}
            heightForIconinAntDesignBtn={responsiveHeight(6)}
            marginLeftForIconinAntDesignBtn={responsiveWidth(5)}
            marginTopForIconinAntDesignBtn={responsiveHeight(0)}   
            boardColorForIconinAntDesignBtn={'transparent'}
            boardWidthForIconinAntDesignBtn={responsiveWidth(0)}
                />
                  </View>

                  <View
                    style={
                      {
                        //backgroundColor:'purple'
                      }
                    }>
                    <AllUITogether
                      show={'CenterTopTextForPageName'}
                      topPageName={'EDIT COLOR'}
                      marginLeftPropsForCenterTopTextForPageName={-7}
                      marginTopPropsForCenterTopTextForPageName={0}
                    />

                      
                  </View>
                </View>
                </View>

                {/*View which will hold back arrow image and EDIT ORDER text ends here   */ }




                <ScrollView    
       keyboardShouldPersistTaps="always"
          
        showsVerticalScrollIndicator={false}
        bounces={false}
        >

         <View
                style={ {
                  
                  flex: 1,
                  height: height-responsiveHeight(10), 

                  /* We have to give minus responsiveHeight(10) inside 'height: height-responsiveHeight(10),' as shown above so that when we open our keyboard to type inside any TextInput and if we move Scroll our Card up and down then the card do not show too much space below while scrolling full card.  */  

                  /* This View will give our ScrollBar space to move up and down while user Types there details inside TextInput so this is how we can specify area for our Scroll, we can not directly put style={} props inside <ScrollView> tag so we have to put one direct child inside <ScrollView> tag which will specify height for how much ScrollView should scroll. */ 
                  
                   /*Since Our Card tag (which is just below this <View> tag) size will not be equal or more than the size of our mobile device, so we can not give our Card 
                   size to be height:height, but if we do not give our Card size height:height then we will see gray colour horizontal 
                   borader below our Card, so to avoid that horizontal boarder of gray colour below our Card we have to give this View 
                   inside our Parent ScrollView so that our Parent ScrollView can occupy height which is equal to our device height, and so we will not see any gray horizontal boarder below where our Card ends or where our ScrollView ends. But if we have kept our Card height equal to our device height and not of height:responsiveHeight(82) then we do not need to give this View because you can see that inside our Parent ScrollView there is only one direct tag which is <Card> tag and inside that <Card> tag every other UI tags are present, so if we have kept height of our <Card> tag of device height then we will not see any gray boarder below our ScrollView, that kind of example is done inside screen for PlatinumEditOrderTwo.js where our <Card> size is very large,larger than our device height also, then also we have kept our <Card> tag height:height and so there we do not need to use this View inside our Root ScrollView which specify that our ScrollView will be equal to height of our device height. 
                    */ 
                } }> 

       
  <Card
    containerStyle={{
      //height:responsiveHeight(78),    
      //height:height,
      width: responsiveWidth(91),
      borderRadius: responsiveWidth(6),
      elevation: responsiveWidth(1),
      marginTop: responsiveHeight(4.5),    
      //marginBottom:responsiveHeight(40),      
      //marginLeft: responsiveWidth(7.5),
    }}>

    <ScrollView
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      bounces={false}>
                
                
                
                
                
                {/*Our UI in Card starts here  */}
                  {/* Code to include Select Carat text & its drop down starts here */}

                    <View>
                    

                      <AnimatedTextInputFile
                        show={'AnimatedTextInputDDL'}
                        ddlWidth={responsiveWidth(81)}   
                        heightOfDDLprops={responsiveHeight(9)} 
                        marginTopPropsForDDL={responsiveHeight(2)}    
                        widthForTextInDDLprops={responsiveWidth(81)}
                        ddlTextmarginLeft={responsiveWidth(-35)}    
                        //ddlTextmarginLeft={responsiveWidth(1)}
                        ddlDownArrowIconmarginLeft={responsiveWidth(-24)}
                        ddlInsideTextFontSize={responsiveFontSize(2)}
                        ddlInsideTextFontName={'raleway-light'}
                        ddlBoarderColor={'#8e8e8e'}
                        ddlboarderThickness={1}
                        ddlInsideTextFontColor={'#2D2D2D'}
                        itemIconPropslabel={''}
                        //dropdownIconProps={require('../images/dropdowncurved.png')}
                        //heightOfDDLprops={9}      
                        //widthForTextInDDLprops={81}    
                        dropdownIconProps={''}
                        largeDropDownListOnPressCallThisAPI={'carat_list'}
                        actionprops={'search'}
                        selectSetter={'ForCaratList'}
                        modalToplabelProps={'Select Carat'}
                        accessTokenprops={accessTokenSentToEditColorScreen}
                        startprops={'0'}
                        limitprops={'100000'}
                        state_idprops={'545'}
                        city_idprops={'454'}
                        search_allprops={'gg'}
                        sortby_nameprops={'desc'}    
                        
                        selectedCaratListFromListProps={ selectedCaratFromListInEditColorScreen }
                        setselectedCaratListFromListProps={ setselectedCaratFromListInEditColorScreen }    
                        

                        setselectedCaratIDFromListProps={setselectedCaratIDInEditColorScreen}
                        selectedCaratIDFromListProps={selectedCaratIDInEditColorScreen}

                        //marginTopPropsForDDL={2}    
                        tintColorForDDLIconLeft={'#283E65'}
                      />







                      
                    </View>

                    {/* Code to include Select Carat text & its drop down ends here */}


                    <View style={{marginTop:responsiveHeight(3)}}>
                    <TextInput
                      style={styles.textInputStyleOnlyForName}
                      //onFocus={()=>setTypingName(true)}
                      //onBlur={()=>setTypingName(false)}
                      //style={ styles.textInputStyle }
                      label="Color Name"
                      mode="outlined"
                      value={colornameInEditColorScreen}
                      onChangeText={(value) =>
                        setcolornameInEditColorScreen(value)        
                      }
                      theme={{
                        roundness: responsiveWidth(10),
                        colors: {
                          primary: '#2B95E1',
                          underlineColor: 'transparent',
                        },
                      }}
                    />
                    </View>

                    

                    {isUpdateProcessRunning == true ? (
                      <ActivityIndicator size="large" color="#013F66" />
                    ) : (
                      <>
                        <Button
                          title="UPDATE COLOR"
                          onPress={() => {
                           setIsUpdateProcessRunning(true);

                            chkAllFieldsEnteredInEditColorScreen();
                          }}
                          titleStyle={{ fontWeight: '700' }}
                          buttonStyle={{
                            backgroundColor: '#283E65',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 30,
                            height: responsiveHeight(7),
                            width: responsiveWidth(81),
                            marginTop: responsiveHeight(2),
                            marginBottom: responsiveHeight(1),   
                          }}
                        />
                      </>
                    )}

                    {callFetchDynamicAPIsInEditColorScreen == true ? (   
                      
                      
                      <FetchDynamicAPIs
                        urlToFetchProps={'manage_color'}
                        screenNameProps={'EditColorScreen'}
                        accessTokenForFetchingAPIProps={
                          accessTokenSentToEditColorScreen
                        }
                        //accessTokenForFetchingAPIProps={''}
                        colorToBeEditedProps={colornameInEditColorScreen}
                        colorIDProps={colorIDToBeEdited}
                        caratIDProps={selectedCaratIDInEditColorScreen}     
                        actionProps={'edit'}   
                        setloaderActiviteOrNotProps={setIsUpdateProcessRunning}  
                        gotoColorScreenAfterEditProps={gotoColorScreen} 
                        callFetchDynamicAPIsInEditColorScreenprops={callFetchDynamicAPIsInEditColorScreen}
                        setcallFetchDynamicAPIsInEditColorScreenprops={setcallFetchDynamicAPIsInEditColorScreen}
                      />
                      
                    ) : null}

                {/*Our UI in Card ends here  */}

                </ScrollView>
    </Card>
 </View>    
  </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: responsiveHeight(55),
    marginTop: responsiveHeight(-5),
  },
  success: {
    width: responsiveWidth(60),
    height: responsiveHeight(30),
    marginLeft: responsiveWidth(20),
    marginTop: responsiveHeight(-10),
  },
  textInputStyle: {
    fontFamily: 'raleway-light',
    backgroundColor: 'white',
    marginTop: responsiveHeight(1),
  },
  textInputStyleOnlyForName: {
    fontFamily: 'raleway-light',
    marginBottom:responsiveHeight(3),
    backgroundColor: 'white',
    marginTop: responsiveHeight(0.5),
  },
});

export default EditColorScreen;
