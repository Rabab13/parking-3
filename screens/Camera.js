import React, {useState, useRef,useEffect} from "react";
import { Image, StyleSheet, StatusBar,PermissionsAndroid, View, Pressable,TouchableOpacity, Text, Platform ,BackHandler} from "react-native";
import {CameraRoll} from "@react-native-camera-roll/camera-roll";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, Padding } from "../GlobalStyles";
import { RNCamera as Camera } from 'react-native-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { launchCamera } from 'react-native-image-picker';

const IPhone14Pro15 = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [flash, setFlash] = useState(false);
  const [imageUri, setImageUri] = useState(null);

//Handle permession and take pic
  async function hasAndroidPermission() {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    const options = { quality: 0.5, base64: true };
    //take pic and save pic
    const data = await cameraRef.current.takePictureAsync(options);
    //view the pic immediately after take them
    const savedImageUri = await CameraRoll.save(data.uri, { type: 'photo', album: 'Test Album' });
    setImageUri({ uri: savedImageUri });
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (imageUri) {
        setImageUri(null);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [imageUri]);

  const handleBackPress = () => {
    if (imageUri) {
      setImageUri(null);
      return true;
    }
    return false;
  };
  if (imageUri) {
    return (
      <View>
        <Image
          source={imageUri}
          style={{ width: "100%", height:"100%" }}
        />
        <Button title="Go back to camera" onPress={() => setImageUri(null)} />
      </View>
    );
  }

  return (
    <View style={styles.iphone14Pro15}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        flashMode={
          flash
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        }
        captureAudio={false}
      />
      {/* {imageUri && (
      <Image
        source={imageUri}
        style={{ width: "100%", height:"100%" }}
      />
    )} */}
      {/* <TouchableOpacity onPress={savePicture}>
          <Text>Take Picture</Text>
        </TouchableOpacity> */}
      <StatusBar barStyle="default" />
      <View style={styles.homeindicator}>
        <View style={styles.homeIndicator} />
      </View>
      <Pressable style={[styles.backBtn, styles.backBtnPosition]}>
      <TouchableOpacity  style={[styles.backBtnChild, styles.childShadowBox]}>
      <TouchableOpacity onPress={() => setFlash(!flash)}>
          <Text>{flash ? '' : ''}</Text>
        </TouchableOpacity>
          {/* <Image
        style={[styles.flashOnIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/flash-on.png")}
      /> */}
       <FontAwesomeIcon icon={faBoltLightning} color="black" style={styles.flashOnIcon}/>
      </TouchableOpacity>
      {/* <FontAwesome name="star" size={60} color="red" /> */}
        {/* <View style={[styles.backBtnChild, styles.childShadowBox]} /> */}
        <Pressable
          style={styles.rectangleParent}
          onPress={() => navigation.navigate("IPhone14Pro7")}
        >
          <Pressable style={[styles.groupChild, styles.childShadowBox]} />
          <Image
          
            style={[styles.vectorIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/vector16.png")}
          />
        </Pressable>
      </Pressable>
      <Image
        style={[
          styles.iphone14Pro15Child,
          styles.backBtnPosition,
          styles.iconLayout,
        ]}
        resizeMode="cover"
        source={require("../assets/ellipse-2.png")}
      />
      <View style={styles.nounScan23885591}>
      <TouchableOpacity onPress={savePicture}>
        <Image
        
          style={styles.vectorIcon1}
          resizeMode="cover"
          source={require("../assets/vector17.png")}
        />
        </TouchableOpacity>
      </View>
 
    
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  backBtnPosition: {
    bottom: "5.63%",
    position: "absolute",
  },
  childShadowBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "rgba(186, 175, 175, 0.5)",
    backgroundColor: Color.labelColorDarkPrimary,
    borderRadius: Border.br_3xs,
    right: "0%",
    height: "100%",
    bottom: "0%",
    top: "0%",
    position: "absolute",
  },
  parkeringskylt1Icon: {
    height: "106.36%",
    width: "113.28%",
    right: "-13.28%",
    bottom: "-6.36%",
    left: "0%",
    top: "0%",
    maxWidth: "100%",
    position: "absolute",
  },
  homeIndicator: {
    borderRadius: Border.br_3xl,
    backgroundColor: Color.lightgray,
    width: 134,
    height: 5,
  },
  homeindicator: {
    height: "2.46%",
    width: "95.9%",
    top: "97.54%",
    right: "1.79%",
    left: "2.31%",
    paddingHorizontal: Padding.p_2xl,
    paddingVertical: Padding.p_2xs,
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: "0%",
    position: "absolute",
  },
  backBtnChild: {
    left: "88.3%",
    width: "11.7%",
  },
  groupChild: {
    left: "0%",
    width: "100%",
  },
  vectorIcon: {
    height: "45%",
    width: "27.5%",
    top: "27.5%",
    right: "40%",
    bottom: "27.5%",
    left: "32.5%",
    position: "absolute",
  },
  rectangleParent: {
    right: "88.3%",
    width: "11.7%",
    height: "100%",
    bottom: "0%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  backBtn: {
    height: "4.69%",
    width: "87.02%",
    top: "89.67%",
    right: "6.62%",
    left: "6.36%",
  },
  iphone14Pro15Child: {
    height: "12.09%",
    width: "26.21%",
    top: "82.28%",
    right: "37.15%",
    left: "36.64%",
  },
  vectorIcon1: {
    width: 53,
    height: 53,
  },
  nounScan23885591: {
    height: "6.26%",
    width: "18.34%",
    top: "85.16%",
    right: "40.91%",
    bottom: "8.58%",
    left: "40.75%",
    flexDirection: "row",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    overflow: "hidden",
  },
  flashOnIcon: {
    top: "27.61%",
    right: "8.4%",
    bottom: "6.46%",
    left: "35.24%",
    position: "absolute",
  },
  iphone14Pro15: {
    backgroundColor: "#dffffe",
    flex: 1,
    height: 849,
    overflow: "hidden",
    width: "100%",
  },
});

export default IPhone14Pro15;
