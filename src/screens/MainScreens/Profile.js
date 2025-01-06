import React, { useContext } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { ProfileContext } from '../../context/ProfileContext';
<<<<<<< HEAD
import CustomInput from '../../components/CustomInput';

const Profile = () => {
  const { colors } = useTheme();
  const { profile, updateProfileImage, saveProfile } = useContext(ProfileContext);
=======
import { AuthContext } from '../../context/AuthContext'; 
import CustomInput from '../../components/CustomInput';
import auth from '@react-native-firebase/auth'; 
const Profile = () => {
  const { colors } = useTheme();
  const { profile, updateProfileImage, saveProfile } = useContext(ProfileContext);
  const { setUser } = useContext(AuthContext); 
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  const devices = useCameraDevices();
  const device = devices.back;

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    return permission === 'authorized';
  };

  const captureImage = async () => {
    if (!device) {
      Alert.alert('Camera Error', 'No camera device available.');
      return;
    }
    const permissionGranted = await requestCameraPermission();
    if (!permissionGranted) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    const photo = await Camera.takePhoto({
      quality: 0.7,
      skipMetadata: true,
    });
    const imageUri = `file://${photo.path}`;
    updateProfileImage(imageUri);
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.5 });
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      updateProfileImage(uri);
    }
  };

<<<<<<< HEAD
=======
  const handleLogout = async () => {
    try {
      await auth().signOut(); 
      setUser(null); 
      Alert.alert('Logged out', 'You have been logged out successfully.');
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
<<<<<<< HEAD
      <Text style={[styles.header, { color: colors.textPrimary }]}>
        Edit Profile
      </Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={
            profile.image
              ? { uri: profile.image }
              : require('../../assets/images/dp.png')
          }
          style={styles.profileImage}
        />
        <View style={styles.editIconGroup}>
          {/* Custom Camera Icon */}
=======
      <Text style={[styles.header, { color: colors.textPrimary }]}>Edit Profile</Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={profile.image ? { uri: profile.image } : require('../../assets/images/dp.png')}
          style={styles.profileImage}
        />
        <View style={styles.editIconGroup}>
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
          <TouchableOpacity
            style={[styles.editIconContainer, { backgroundColor: colors.orange }]}
            onPress={captureImage}
          >
<<<<<<< HEAD
            <Image
              source={require('../../assets/icons/custom-camera-icon.png')} // Path to your custom camera icon
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          {/* Custom Gallery Icon */}
=======
            <Image source={require('../../assets/icons/camera.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
          <TouchableOpacity
            style={[styles.editIconContainer, { backgroundColor: colors.green }]}
            onPress={openGallery}
          >
<<<<<<< HEAD
            <Image
              source={require('../../assets/icons/custom-gallery-icon.png')} // Path to your custom gallery icon
              style={{ width: 24, height: 24 }}
            />
=======
            <Image source={require('../../assets/icons/gallery.png')} style={{ width: 24, height: 24 }} />
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
          </TouchableOpacity>
        </View>
      </View>

<<<<<<< HEAD
      {/* Profile Details */}
=======
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
      <View style={styles.inputFieldsContainer}>
        <CustomInput
          label="Your Name"
          value={profile.name}
          onChangeText={(text) => saveProfile({ ...profile, name: text })}
          placeholder="Yousha"
<<<<<<< HEAD
          icon={
            <Image
              source={require('../../assets/icons/custom-user-icon.png')} // Custom user icon
              style={{ width: 24, height: 24 }}
            />
          }
=======
          icon={<Image source={require('../../assets/icons/profile.png')} style={{ width: 24, height: 24 }} />}
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
        />
        <CustomInput
          label="Email"
          value={profile.email}
          onChangeText={(text) => saveProfile({ ...profile, email: text })}
          placeholder="yousha@example.com"
<<<<<<< HEAD
          icon={
            <Image
              source={require('../../assets/icons/custom-email-icon.png')} // Custom email icon
              style={{ width: 24, height: 24 }}
            />
          }
=======
          icon={<Image source={require('../../assets/icons/mail.png')} style={{ width: 35, height: 35 }} />}
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
        />
        <CustomInput
          label="Phone Number"
          value={profile.phoneNumber}
          onChangeText={(text) => saveProfile({ ...profile, phoneNumber: text })}
          placeholder="+92 234 567 890"
<<<<<<< HEAD
          icon={
            <Image
              source={require('../../assets/icons/custom-phone-icon.png')} // Custom phone icon
              style={{ width: 24, height: 24 }}
            />
          }
=======
          icon={<Image source={require('../../assets/icons/phone.png')} style={{ width: 15, height: 15 }} />}
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
        />
        <CustomInput
          label="Website"
          value={profile.website}
          onChangeText={(text) => saveProfile({ ...profile, website: text })}
          placeholder="www.yousha.com"
<<<<<<< HEAD
          icon={
            <Image
              source={require('../../assets/icons/custom-globe-icon.png')} // Custom globe icon
              style={{ width: 24, height: 24 }}
            />
          }
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.orange }]}
        onPress={() => Alert.alert('Profile Saved', 'Your changes have been saved.')}
      >
        <Text style={[styles.saveButtonText, { color: colors.textWhite }]}>
          Save Changes
        </Text>
=======
          icon={<Image source={require('../../assets/icons/website.png')} style={{ width: 24, height: 24 }} />}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButtonContainer}
        onPress={() => Alert.alert('Profile Saved', 'Your changes have been saved.')}
      >
        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </View>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: '#ddd',
  },
  editIconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '40%',
    marginTop: 10,
  },
  editIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldsContainer: {
    marginVertical: 16,
  },
<<<<<<< HEAD
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
=======
  saveButtonContainer: {
    marginVertical: 16,
    borderRadius: 25,
    overflow: 'hidden',
  },
  saveButton: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#d32f2f',
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
  },
});

export default Profile;
