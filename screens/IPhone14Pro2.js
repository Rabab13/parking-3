import {
  Image,
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Platform 
} from "react-native";
import React,{useEffect,useState} from "react";
import LinearGradient from 'react-native-linear-gradient';
// import StatusContainer from "../components/StatusContainer";
import { useNavigation } from "@react-navigation/native";
import ScanContainer from "../components/ScanContainer";
import ParkingDiscContainer from "../components/ParkingDiscContainer";
import ImageContainer from "../components/ImageContainer";
import ParkContainer from "../components/ParkContainer";
import {
  Color,
  FontFamily,
  Border,
  Padding,
  FontSize,
  Margin,
} from "../GlobalStyles";
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  webClientId:
  "402220314576-rblk1278hvvg2cjj6pstqk7r6gvvsmjk.apps.googleusercontent.com",
  offlineAccess: true,
  androidClientId:"1:402220314576:android:a5dec03b4b2969253353d5"
  });

const IPhone14Pro2 = () => {

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // User is already logged in, navigate to main screen
        navigation.navigate("IPhone14Pro5");
      }
    });
    return unsubscribe;
  }, [navigation]);
  
  //GOOGLE Sign in
  const [userInfo, setUserInfo] = useState(null); 
  
 
 const onGoogleButtonPress = async () => {
  let isLoginSuccessful = false;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      const { idToken } = userInfo;
      const credential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in the user with the credential
      auth().signInWithCredential(credential)
        .then(() => {
    console.log('User account created & signed in!');
  })
      // console.log("this is user info ", userInfo)
      isLoginSuccessful = true;
    } catch (error) {
      console.log(error,"this error")
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    if (isLoginSuccessful) {
      navigation.navigate("IPhone14Pro5", { onContinue: handleContinue });
    }
  };
  const handleContinue = () => {
    onContinue();
    navigation.navigate("IPhone14Pro5");
  };

  
  //APPLE Sign in
    const handleAppleLogin=async () => {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: AppleAuthRequestOperation.LOGIN,
          requestedScopes: [
            AppleAuthRequestScope.EMAIL,
            AppleAuthRequestScope.FULL_NAME,
          ],
        });
        const { identityToken, nonce } = appleAuthRequestResponse
        loginWithApple(identityToken, nonce)
        .then(async response => {
          if (response?.user) {
            //handle successful login
            resolve({success: true})
          } else {
            //handle unsuccessful login
            resolve({success: false})
          }
        })
        console.log('appleAuthRequestResponse: ', appleAuthRequestResponse);
        navigation.navigate("IPhone14Pro5");
      } catch (error) {
        console.log('appleAuth.performRequest error: ', error);
      }
    }
    const loginWithApple = (identityToken, nonce) => { 
      const appleCredential = RNFirebaseAuth.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      )
      return new Promise((resolve, _reject) => {
        RNFirebaseAuth
          .auth()
          .signInWithCredential(credential)
          .then(response => {
            const isNewUser = response.additionalUserInfo.isNewUser
            const {
              first_name,
              last_name,
              family_name,
              given_name,
            } = response.additionalUserInfo.profile
            const { uid, email, phoneNumber, photoURL } = response.user
            const defaultProfilePhotoURL =
              'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'
            if (isNewUser) {
              const timestamp = firebase.firestore.FieldValue.serverTimestamp()
              const userData = {
                id: uid,
                email: email || '',
                firstName: first_name || given_name || '',
                lastName: last_name || family_name || '',
                phone: phoneNumber || '',
                profilePictureURL: photoURL || defaultProfilePhotoURL,
                userID: uid,
                createdAt: timestamp,
              }
              // PERSIST NEW USER DATA TO YOU PREFFERRED DB AND SAVE ON REDUX
            }
            // UPDATE USER LAST LOGIN
            resolve({success: true})
            
          })
          .catch(_error => {
            console.log(_error)
            resolve({ success: false })
          })
      })
    }
    //test for user info
    // if (userInfo) {
    //   return (
    //     <View>
    //       <Text>Welcome, {userInfo.user.name}!</Text>
    //     </View>
    //   );
    // } 
  return (
    <View style={styles.iphone14Pro2}>
      <Image
        style={styles.unsplashp5a9mj4vlsIcon}
        resizeMode="cover"
        source={require("../assets/unsplashp5a9mj4vls.png")}
      />
      {/* <StatusContainer
        // notch={{ uri: "notch2@3x.png" }}
        // carImageUrl={require("../assets/right-side.png")}
        propColor="white"
        statusContainerStatusBarITop={-2}
        notchTop={2}
      /> */}
      <LinearGradient
        style={[styles.iphone14Pro2Child, styles.homeindicatorPosition]}
        locations={[0, 1]}
        colors={["rgba(3, 29, 30, 0)", "#60219f"]}
      />
        {Platform.OS === 'android' ? (
         
        <TouchableOpacity style={[styles.logGoogle, styles.logGoogleFlexBox]}
        onPress={onGoogleButtonPress}
        >
          <View style={[styles.googleParent, styles.parentFlexBox]}>
            <Image
              style={styles.googleIcon}
              resizeMode="cover"
              source={require("../assets/google.png")}
            />
            <Text
              style={[
                styles.continueWithGoogle,
                styles.ml9,
                styles.noMoreFinesFlexBox,
              ]}
            >
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        style={styles.signinwithapple}
        activeOpacity={0.2}
        onPress={handleAppleLogin}
      >
        <View style={styles.appleLogo}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector.png")}
          />
        </View>
        <Text style={[styles.continueWithApple, styles.ml11]}>
          Continue with Apple
        </Text>
      </TouchableOpacity>
      )}
      
      <Text
        style={[styles.byContinuingYouContainer, styles.noMoreFinesFlexBox]}
      >
        <Text style={styles.byContinuingYouContainer1}>
          <Text style={styles.byContinuingYouAgreeToOur}>
            <Text
              style={styles.byContinuingYou}
            >{`By continuing you agree to our `}</Text>
          </Text>
          <Text style={styles.termsOfUsePrivacyPolicy}>
            <Text>Terms of Use</Text>
            <Text>{` & `}</Text>
            <Text style={styles.noMoreFinesTypo}>Privacy Policy</Text>
          </Text>
        </Text>
      </Text>
      <Text
        style={[
          styles.noMoreFines,
          styles.noMoreFinesTypo,
          styles.noMoreFinesFlexBox,
        ]}
      >
        No more fines through AI.
      </Text>
      <View style={[styles.homeindicator, styles.homeindicatorPosition]}>
        <View style={styles.homeIndicator} />
      </View>
      <Image
        style={styles.iphone14Pro2Item}
        resizeMode="cover"
        source={require("../assets/group-46.png")}
      />
      <ScanContainer/>
      <ParkingDiscContainer/>
      <ImageContainer/>
      <ParkContainer/>
    </View>
  );
      
};

const styles = StyleSheet.create({
  ml11: {
    marginLeft: 11,
  },
  homeindicatorPosition: {
    bottom: "0%",
    position: "absolute",
  },
  noMoreFinesFlexBox: {
    textAlign: "center",
    
    display: "flex",
    color: Color.labelColorDarkPrimary,
    letterSpacing:0.5,
    alignItems: "center",
    position: "absolute",
  },
  noMoreFinesTypo: {
    fontFamily: FontFamily.dMSansMedium,
    fontWeight: "500",
  },
  unsplashp5a9mj4vlsIcon: {
    marginTop: -424,
    width: "117.1%",
    top: "50%",
    right: "-17.1%",
    left: "0%",
    maxWidth: "100%",
    height: 861,
    position: "absolute",
    overflow: "hidden",
  },
  iphone14Pro2Child: {
    height: "50.59%",
    top: "49.41%",
    right: 0,
    left: 0,
    backgroundColor: "transparent",
  },
  vectorIcon: {
    width: 14,
    height: 18,
  },
  appleLogo: {
    borderRadius: Border.br_xl,
    width: 19,
    height: 22,
    paddingHorizontal: 2,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  continueWithApple: {
    fontSize: FontSize.defaultBoldBody1_size,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: FontFamily.defaultBoldBody1,
    textAlign: "left",
    width: 170,
    height: 23,
    display: "flex",
    color: Color.labelColorDarkPrimary,
    letterSpacing: 0,
    alignItems: "center",
  },
  signinwithapple: {
    height: "5.9%",
    width: "67.1%",
    top: "83.25%",
    right: "16.84%",
    bottom: "10.85%",
    left: "16.06%",
    paddingTop: Padding.p_md,
    paddingRight: 4,
    paddingBottom: 13,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: Border.br_3xl,
    position: "absolute",
    backgroundColor: Color.black,
  },
  byContinuingYou: {
    fontFamily: FontFamily.dMSansRegular,
  },
  byContinuingYouAgreeToOur: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  termsOfUsePrivacyPolicy: {
    margin: Margin.m_sm,
  },
  byContinuingYouContainer1: {
    // lineBreak: "anywhere",
    width: "100%",
  },
  byContinuingYouContainer: {
    height: "4.69%",
    top: "89.2%",
    left: 137,
    fontSize: FontSize.size_4xs,
    lineHeight: 11,
    width: 132,
  },
  noMoreFines: {
    height: "7.14%",
    width: "51.55%",
    top: "73.99%",
    left: "25.65%",
    fontSize: FontSize.size_xl,
    // lineHeight: 18,
    justifyContent: "center",
  },
  homeIndicator: {
    backgroundColor: Color.lightgray,
    width: 134,
    height: 5,
    borderRadius: Border.br_3xl,
  },
  homeindicator: {
    height: "2.46%",
    top: "97.54%",
    right: 9,
    left: 10,
    paddingHorizontal: Padding.p_2xl,
    paddingVertical: Padding.p_2xs,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iphone14Pro2Item: {
    height: "6.49%",
    marginLeft: -27,
    top: "66.65%",
    bottom: "26.86%",
    left: "50%",
    maxHeight: "100%",
    width: "15%",
    position: "absolute",
  },
  iphone14Pro2: {
    flex: 1,
    height: 848,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.black,
  },
  googleIcon: {
    marginLeft:"13%",
    right:30,
    width: 30,
    height: 30,
    borderRadius: Border.br_xl,
    overflow: "hidden",
    // right:100
  },
  continueWithGoogle: {
    paddingLeft:40,
    fontSize: FontSize.defaultBoldBody1_size,
    fontFamily: FontFamily.interRegular,
  },
  googleParent: {
     
    // justifyContent: "center",
    flexDirection: 'row',
    flex: 1,
  },
  logGoogle: {
    
    height: "5.9%",
    top: "82.43%",
    right: 49,
    bottom: "11.67%",
    left: 54,
    backgroundColor: Color.tomato,
    paddingHorizontal: Padding.p_lg,
    paddingVertical: Padding.p_xs,
    alignItems: "flex-end",
    borderRadius: Border.br_xl,
    flex:1,
    flexDirection:"row"
  },
  logGoogleFlexBox: {
   
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
  },
  parentFlexBox: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
  },
  ml9: {
    marginLeft: 9,
  },
});

export default IPhone14Pro2;
