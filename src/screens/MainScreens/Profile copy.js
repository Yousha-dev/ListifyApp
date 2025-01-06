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
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { ProfileContext } from '../../context/ProfileContext';
import { AuthContext } from '../../context/AuthContext';
import CustomInput from '../../components/CustomInput';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const { colors } = useTheme();
  const { profile, updateProfileImage, saveProfile } = useContext(ProfileContext);
  const { setUser } = useContext(AuthContext);

  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();

  const captureImage = async () => {
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    if (!device) {
      Alert.alert('Camera Error', 'No camera device available.');
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

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUser(null);
      Alert.alert('Logged out', 'You have been logged out successfully.');
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  if (!hasPermission) {
    return <Text style={{ color: colors.textPrimary, textAlign: 'center', marginTop: 20 }}>Camera permission is required.</Text>;
  }

  if (!device) {
    return <Text style={{ color: colors.textPrimary, textAlign: 'center', marginTop: 20 }}>No camera device available.</Text>;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={[styles.header, { color: colors.textPrimary }]}>Edit Profile</Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={profile.image ? { uri: profile.image } : require('../../assets/images/dp.png')}
          style={styles.profileImage}
        />
        <View style={styles.editIconGroup}>
          <TouchableOpacity
            style={[styles.editIconContainer, { backgroundColor: colors.orange }]}
            onPress={captureImage}
          >
            <Image source={require('../../assets/icons/camera.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editIconContainer, { backgroundColor: colors.green }]}
            onPress={openGallery}
          >
            <Image source={require('../../assets/icons/gallery.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputFieldsContainer}>
        <CustomInput
          label="Your Name"
          value={profile.name}
          onChangeText={(text) => saveProfile({ ...profile, name: text })}
          placeholder="Yousha"
          icon={<Image source={require('../../assets/icons/profile.png')} style={{ width: 24, height: 24 }} />}
        />
        <CustomInput
          label="Email"
          value={profile.email}
          onChangeText={(text) => saveProfile({ ...profile, email: text })}
          placeholder="yousha@example.com"
          icon={<Image source={require('../../assets/icons/mail.png')} style={{ width: 35, height: 35 }} />}
        />
        <CustomInput
          label="Phone Number"
          value={profile.phoneNumber}
          onChangeText={(text) => saveProfile({ ...profile, phoneNumber: text })}
          placeholder="+92 234 567 890"
          icon={<Image source={require('../../assets/icons/phone.png')} style={{ width: 15, height: 15 }} />}
        />
        <CustomInput
          label="Website"
          value={profile.website}
          onChangeText={(text) => saveProfile({ ...profile, website: text })}
          placeholder="www.yousha.com"
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

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
  },
});

export default Profile;
