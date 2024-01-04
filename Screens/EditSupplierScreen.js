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

const EditSupplierScreen = ({navigation }) => {
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
    accessTokenSentToEditSupplier,
    nameToBeEdited,
    supplierIDToBeEdited,
    mobileNumberToBeEdited,
    orderPersonToBeEdited,
    orderPersonNumberToBeEdited,
    addressToBeEdited,
    cityToBeEdited,
    stateToBeEdited,
    cityIDToBeEdited,
    stateIDToBeEdited,
    supplierCodeToBeEdited,  
    } = route.params; 

  /* accessTokenSentToEditSupplier =
    route.params.accessTokenSentToEditsupplierScreen;
  name = route.params.nameToBeEdited;
  id = route.params.supplierIDToBeEdited;
  orderPerson = route.params.orderPersonToBeEdited;
  mobileNumber = route.params.mobileNumberToBeEdited;
  orderPersonNumber = route.params.orderPersonNumberToBeEdited;
  address = route.params.addressToBeEdited;
  city = route.params.cityToBeEdited;
  state = route.params.stateToBeEdited;
  stateWithID=route.params.stateIDToBeEdited;
  cityWithID=route.params.cityIDToBeEdited;
  supplierCode=route.params.supplierCodeToBeEdited; */

//alert('Name of supplier is:'+name+'State name is:'+state+' State ID is:'+stateWithID+' City name is:'+city+' City ID is:'+cityWithID);

  //alert('Name got is:'+name);

  const [selectedStateFromList, setselectedStateFromList] = useState('State');

  const [editsupplierScreenModal, setEditsupplierScreenModal] = useState(true);

  const [selectedCityFromList, setselectedCityFromList] = useState('City');

  const [
    callFetchDynamicAPIsInEditSupplierScreen,
    setcallFetchDynamicAPIsInEditSupplierScreen,
  ] = useState(false);

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
    if (createNewUserResultInDigit == 1) {
      if (
        createNewUserResultInText == 'User Already exiest with this mobile no!'
      ) {
        navigation.replace('Register', {
          sameContactNoPropslabel: 1,
          sameEmailPropslabel: 0,
        });

        //contactPersonNoTextInputRef.current?.focus()
      } else if (
        createNewUserResultInText == 'The email has already been taken.'
      ) {
        navigation.replace('Register', {
          sameContactNoPropslabel: 0,
          sameEmailPropslabel: 2,
        });
      } else {
        if (createNewUserResultTrueOrFalse == true) {
          removeData();
          navigation.replace('LoginScreen');
        }
      }
    }
  });

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


  /* 
   nameToBeEdited,
    supplierIDToBeEdited,
    mobileNumberToBeEdited,
    orderPersonToBeEdited,
    orderPersonNumberToBeEdited,
    addressToBeEdited,
    cityToBeEdited,
    stateToBeEdited,
    cityIDToBeEdited,
    stateIDToBeEdited,
    supplierCodeToBeEdited,
   */

  let [nameInEditSupplierScreen, setNameInEditSupplierScreen] = useState(nameToBeEdited);

  let [supplierCodeInEditSupplierScreen, setsupplierCodeInEditSupplierScreen] = useState(supplierCodeToBeEdited);
  
  
  let [supplierIDInEditSupplierScreen, setsupplierIDInEditSupplierScreen] =
    useState(supplierIDToBeEdited);
  
  let [
    contact_personNameInEditSupplierScreen,
    setContactPersonNameInEditSupplierScreen,
  ] = useState('');
 
  let [mobileNumberInEditSupplierScreen, setMobileNumberInEditSupplierScreen] =
    useState(mobileNumberToBeEdited);
  
  let [
    contact_mobileInEditSupplierScreen,
    setContact_mobileInEditSupplierScreen,
  ] = useState('');
  
  let [addressInEditSupplierScreen, setAddressInEditSupplierScreen] =
    useState(addressToBeEdited);
  
  let [stateInEditSupplierScreen, setStateInEditSupplierScreen] = useState(stateToBeEdited);
  
  let [stateIDInEditSupplierScreen, setStateIDInEditSupplierScreen] =
    useState(0);
   
    let [typingName, setTypingName] =useState(false);
    
    

  let [cityInEditSupplierScreen, setCityInEditSupplierScreen] = useState(cityToBeEdited);
 
  let [cityIDInEditSupplierScreen, setCityIDInEditSupplierScreen] = useState(0);


  let [orderPersonInEditSupplierScreen, setOrderPersonInEditSupplierScreen] = useState(orderPersonToBeEdited);


  let [orderPersonNumberInEditSupplierScreen, setOrderPersonNumberInEditSupplierScreen] = useState(orderPersonNumberToBeEdited);

  let [resultForNewUserCreated, setResultForNewUserCreated] = useState([]);

  const registerNewUser = () => {
    let data = {
      name,
      shop_name,
      address,
      contact_no,
      email,
      password,
      c_password,
      website,
      contact_person,
      contact_person_no,
      state,
      city,
      pincode,
    };

    console.log('Register function executing..');

    fetch('https://rajeshwersoftsolution.com/jwelcart/api/registershop', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      resultForNewUserCreated = response.json();
      resultForNewUserCreated.then((values) => {
        console.log(values);
        //Alert.alert(values.message);
        setIsLoading(false);
        setCreateNewUserResultInDigit(1);
        setCreateNewUserResultTrueOrFalse(values.result);
        setCreateNewUserResultInText(values.message);
        ToastAndroid.showWithGravity(
          values.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      });
    });
  };

  const chkAllFieldsEnteredInEditSupplierScreen = () => {
    if (!nameInEditSupplierScreen.trim()) {
      //alert('Please Enter Website');
      ToastAndroid.showWithGravity(
        'Please Enter Name',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }
    //Check for the Email TextInput

    if (!mobileNumberInEditSupplierScreen.trim()) {
      //alert('Please Enter Contact Person Number');
      ToastAndroid.showWithGravity(
        'Please Enter Mobile Number',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    } else if (mobileNumberInEditSupplierScreen.length < 10) {
      //alert('Please Enter Mobile Number with Minimum 10 digits');
      ToastAndroid.showWithGravity(
        'Please Enter Mobile Number with Minimum 10 digits',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    } else if (mobileNumberInEditSupplierScreen.length > 10) {
      //alert('Please Enter Mobile Number with Minimum 10 digits');
      ToastAndroid.showWithGravity(
        'Please Enter Mobile Number with Maximum 10 digits Only',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }

    if (!addressInEditSupplierScreen.trim()) {
      //alert('Please Enter Address');
      ToastAndroid.showWithGravity(
        'Please Enter Address',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }
    if (!stateInEditSupplierScreen.trim()) {
      //alert('Please Enter State');
      ToastAndroid.showWithGravity(
        'Please Enter State',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }
    if (!cityInEditSupplierScreen.trim()) {
      //alert('Please Enter City');
      ToastAndroid.showWithGravity(
        'Please Enter City',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      return;
    }

    setcallFetchDynamicAPIsInEditSupplierScreen(true);
  };

   useEffect(() => {
    alert(
      'supplierCodeToBeEdited got is:'+supplierCodeToBeEdited+'\n'+
      'supplierIDToBeEdited got is:'+supplierIDToBeEdited+'\n'
    );      
    
     //alert('Name of supplier is:'+nameInEditSupplierScreen+'State name is:'+stateInEditSupplierScreen+' State ID is:'+stateIDInEditSupplierScreen+' City name is:'+cityInEditSupplierScreen+' City ID is:'+cityIDInEditSupplierScreen); 
  }, []); 

  const gotoSupplierScreen = () => {
    //alert('Btn clicked....');
     navigation.navigate("SupplierScreen", {
      accessTokenSentToSupplierScreen: accessTokenSentToEditSupplier,
    }); 
    setEditsupplierScreenModal(false);
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

          


          {/*View which will hold back arrow image and EDIT ORDER text starts here  */}
                <View style={{
                  marginTop:responsiveHeight(-32),    
                  //backgroundColor:'purple',
                  }}>
                <View
                  style={{
                    marginTop: responsiveHeight(0.5),
                    marginLeft: responsiveWidth(-4),
                    //marginBottom: responsiveHeight(10),
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
                      dothisProps={gotoSupplierScreen}
                      iconDesignName={'left'}
                colorForIconinAntDesignBtn={'gold'}
                backgroundColorForIconinAntDesignBtn={'transparent'}
                sizeForIconinAntDesignBtn={26}
                boardRadiusForIconinAntDesignBtn={10}
                widthForIconinAntDesignBtn={11}
                heightForIconinAntDesignBtn={6}
                marginLeftForIconinAntDesignBtn={5}
                marginTopForIconinAntDesignBtn={1.5}   
                boardColorForIconinAntDesignBtn={'transparent'}
                boardWidthForIconinAntDesignBtn={0}
                    />*/}
                    <AllUITogether
            show={'AntIconBtn'}
              dothisProps={gotoSupplierScreen}    
            //dothisProps={gotoAddStaffScreen}
            iconDesignName={'left'}
            colorForIconinAntDesignBtn={'gold'}
            backgroundColorForIconinAntDesignBtn={'transparent'}
            sizeForIconinAntDesignBtn={26}
            boardRadiusForIconinAntDesignBtn={10}
            widthForIconinAntDesignBtn={responsiveWidth(11)}
            heightForIconinAntDesignBtn={responsiveHeight(6)}
            marginLeftForIconinAntDesignBtn={responsiveWidth(5)}
            marginTopForIconinAntDesignBtn={responsiveHeight(1.5)}   
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
                      topPageName={'EDIT'}
                      marginLeftPropsForCenterTopTextForPageName={-7}
                      marginTopPropsForCenterTopTextForPageName={0}
                    />

                    <AllUITogether
                      show={'CenterTopTextForPageName'}
                      topPageName={'SUPPLIER'}
                      marginLeftPropsForCenterTopTextForPageName={-7}
                      marginTopPropsForCenterTopTextForPageName={-2}
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
      height:responsiveHeight(78),    
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
                  <TextInput
                      style={styles.textInputStyleOnlyForName}
                      //onFocus={()=>setTypingName(true)}
                      //onBlur={()=>setTypingName(false)}
                      //style={ styles.textInputStyle }
                      label="Name"
                      mode="outlined"
                      value={nameInEditSupplierScreen}
                      onChangeText={(value) =>
                        setNameInEditSupplierScreen(value)
                      }
                      theme={{
                        roundness: responsiveWidth(10),
                        colors: {
                          primary: '#2B95E1',
                          underlineColor: 'transparent',
                        },
                      }}
                    />

                    {/*  <Text>
          Values passed from First page: {route.params.namePropslabel}
        </Text> */}

                    <TextInput
                      label="Mobile Number"
                      keyboardType={'phone-pad'}
                      style={styles.textInputStyle}
                      mode="outlined"
                      theme={{
                        roundness: responsiveWidth(10),
                        colors: {
                          primary: '#2B95E1',
                          underlineColor: 'transparent',
                        },
                      }}
                      value={mobileNumberInEditSupplierScreen}
                      onChangeText={(value) =>
                        setMobileNumberInEditSupplierScreen(value)
                      }
                    />

                    <TextInput
                      style={styles.textInputStyle}
                      label="Address"
                      mode="outlined"
                      value={addressInEditSupplierScreen}
                      onChangeText={(value) =>
                        setAddressInEditSupplierScreen(value)
                      }
                      theme={{
                        roundness: responsiveWidth(10),
                        colors: {
                          primary: '#2B95E1',
                          underlineColor: 'transparent',
                        },
                      }}
                    />

                    {/* Drop Down for State List starts here */}
                    
                    <AnimatedTextInputFile
                      show={'AnimatedTextInputDDL'}
                      heightOfDDLprops={responsiveHeight(7)} 
                        marginTopPropsForDDL={responsiveHeight(2)}    
                        widthForTextInDDLprops={responsiveWidth(81)}
                      ddlWidth={295}
                      ddlTextmarginLeft={responsiveWidth(-7)}
                      ddlDownArrowIconmarginLeft={responsiveWidth(22)}
                      ddlInsideTextFontSize={responsiveFontSize(2)}
                      //marginVerticalPropsForDDL={0.9}
                      //marginTopPropsForDDL={2}
                      ddlInsideTextFontName={'raleway-light'}
                      dropdownIconProps={require('../images/dropdowncurved.png')}
                     // heightOfDDLprops={7}
                      largeDropDownListTopLabel={''}
                      itemIconPropslabel={''}
                      modalToplabelProps={'Select State'}
                      ddlBoarderColor={'#8e8e8e'}
                      ddlboarderThickness={1}
                      largeDropDownListOnPressCallThisAPI={'fetch_state_new'}
                      selectSetter={'ForState'}
                      //selectedStateFromListProps={ selectedStateFromList }
                      //setselectedStateFromListProps={ setselectedStateFromList }

                      selectedStateFromListProps={stateInEditSupplierScreen}
                      setselectedStateFromListProps={
                        setStateInEditSupplierScreen
                      }
                      setselectedStateIDFromListProps={
                        setStateIDInEditSupplierScreen
                      }
                    />
                    

                    {/* DropDown for State List Ends Here */}

                    {/* Drop Down for City List starts here */}

                    <AnimatedTextInputFile
                      show={'AnimatedTextInputDDL'}
                      heightOfDDLprops={responsiveHeight(7)} 
                        marginTopPropsForDDL={responsiveHeight(2)}    
                        widthForTextInDDLprops={responsiveWidth(81)}
                      ddlWidth={295}
                      ddlTextmarginLeft={responsiveWidth(-7)}
                      ddlDownArrowIconmarginLeft={responsiveWidth(22)}
                      ddlInsideTextFontSize={responsiveFontSize(2)}
                      //marginVerticalPropsForDDL={0.9}
                      //marginTopPropsForDDL={2}
                      ddlInsideTextFontName={'raleway-light'}
                      largeDropDownListTopLabel={''}
                      dropdownIconProps={require('../images/dropdowncurved.png')}
                      //heightOfDDLprops={7}
                      itemIconPropslabel={''}
                      modalToplabelProps={'Select City'}
                      ddlBoarderColor={'#8e8e8e'}
                      ddlboarderThickness={1}
                      largeDropDownListOnPressCallThisAPI={'fetch_city_new'}
                      actionprops={''}
                      selectSetter={'ForCity'}
                      state_idprops={'32432'}
                      //selectedCityFromListProps={ selectedCityFromList }
                      //setselectedCityFromListProps={ setselectedCityFromList }

                      selectedCityFromListProps={cityInEditSupplierScreen}
                      setselectedCityFromListProps={setCityInEditSupplierScreen}
                      setselectedCityIDFromListProps={
                        setCityIDInEditSupplierScreen
                      }
                    />

                    {/* DropDown for City List Ends Here */}

                    {/* <TextInput
                      style={styles.textInputStyle}
                      label="Contact Person"
                      mode="outlined"
                      value={contact_personNameInEditSupplierScreen}
                      onChangeText={(value) =>
                        setContactPersonNameInEditSupplierScreen(value)
                      }
                      theme={{
                        roundness: responsiveWidth(10),
                        colors: {
                          primary: '#2B95E1',
                          underlineColor: 'transparent',
                        },
                      }}
                    /> */}

                    <TextInput
                      style={styles.textInputStyle}
                      label="Contact Person"
                      mode="outlined"
                      value={orderPersonInEditSupplierScreen}
                      onChangeText={(value) =>
                        setOrderPersonInEditSupplierScreen(value)
                      }
                      theme={{
                        roundness: responsiveWidth(10),
                        colors: {
                          primary: '#2B95E1',
                          underlineColor: 'transparent',
                        },
                      }}
                    />

                    {/* <TextInput
                      label="Contact Mobile Number"
                      keyboardType={'phone-pad'}
                      style={styles.textInputStyle}
                      mode="outlined"
                      theme={{
                        roundness: responsiveWidth(10),
                        colors: {
                          primary: '#2B95E1',
                          underlineColor: 'transparent',
                        },
                      }}
                      value={contact_mobileInEditSupplierScreen}
                      onChangeText={(value) =>
                        setOrderPersonNumberInEditSupplierScreen(value)
                      }
                    /> */}

                    <TextInput
                      label="Contact Mobile Number"
                      keyboardType={'phone-pad'}
                      style={styles.textInputStyle}
                      mode="outlined"
                      theme={{
                        roundness: responsiveWidth(10),
                        colors: {
                          primary: '#2B95E1',
                          underlineColor: 'transparent',
                        },
                      }}
                      value={orderPersonNumberInEditSupplierScreen}
                      onChangeText={(value) =>
                        setOrderPersonNumberInEditSupplierScreen(value)
                      }
                    />

                    {isUpdateProcessRunning == true ? (
                      <ActivityIndicator size="large" color="#013F66" />
                    ) : (
                      <>
                        <Button
                          title="EDIT SUPPLIER"
                          onPress={() => {
                           setIsUpdateProcessRunning(true);

                            chkAllFieldsEnteredInEditSupplierScreen();
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
                            marginBottom: responsiveHeight(0),
                          }}
                        />
                      </>
                    )}

                    {callFetchDynamicAPIsInEditSupplierScreen == true ? (   
                      
                      
                      <FetchDynamicAPIs
                        urlToFetchProps={'manage_supplier'}
                        screenNameProps={'EditSupplierScreen'}
                        accessTokenForFetchingAPIProps={
                          accessTokenSentToEditSupplier
                        }
                        //accessTokenForFetchingAPIProps={''}
                        namePropsToEdit={nameInEditSupplierScreen}
                        mobilenoPropsToEdit={mobileNumberInEditSupplierScreen}
                        stateIDPropsToEdit={stateIDInEditSupplierScreen}
                        cityIDPropsToEdit={cityIDInEditSupplierScreen}    
                        addressPropsToEdit={addressInEditSupplierScreen}
                        
                        
                        orderPersonIEContactPersonPropsToEdit={orderPersonInEditSupplierScreen}
                        orderPersonNumberIEContactMobileNumberPropsToEdit={orderPersonNumberInEditSupplierScreen}
                        supplierCodePropsToEdit={supplierCodeInEditSupplierScreen}
                        supplierIDProps={supplierIDInEditSupplierScreen}
                            
                        //supplierIDProps={supplierIDInEditSupplierScreen}
                        actionProps={'edit'}
                        setloaderActiviteOrNotProps={setIsUpdateProcessRunning}  
                        gotoSupplierScreenAfterEditProps={gotoSupplierScreen} 
                        callFetchDynamicAPIsInEditSupplierScreenprops={callFetchDynamicAPIsInEditSupplierScreen}
                        setcallFetchDynamicAPIsInEditSupplierScreenprops={setcallFetchDynamicAPIsInEditSupplierScreen}
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

    backgroundColor: 'white',
    marginTop: responsiveHeight(0.5),
  },
});

export default EditSupplierScreen;
