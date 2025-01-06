import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import notifee from '@notifee/react-native';

const createNotificationChannel = async () => {
    await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
};

export const FirebaseNotificationInit = () => {
    createNotificationChannel();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    mapFirebaseEvents();
};

const mapFirebaseEvents = () => {
    try {
        messaging().getToken().then((token) => {
            console.log('FCM Token:', token);
            // Save token to database or API
        });

        messaging().onTokenRefresh((token) => {
            console.log('FCM Token refreshed:', token);
            // Save refreshed token
        });

        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('App opened from background:', remoteMessage.notification);
            processNotification(remoteMessage, true);
        });

        messaging().getInitialNotification().then((remoteMessage) => {
            if (remoteMessage) {
                console.log('App opened from quit state:', remoteMessage.notification);
                processNotification(remoteMessage);
            }
        });

        messaging().onMessage(async (remoteMessage) => {
            console.log('Foreground notification received:', remoteMessage.notification);
            await notifee.displayNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                android: {
                    channelId: 'default',
                },
            });
            processNotification(remoteMessage);
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('Background message handled:', remoteMessage);
            processNotification(remoteMessage);
        });
    } catch (error) {
        console.error('Firebase notification error:', error);
    }
};

const processNotification = (messageReceived, gotoNavigationScreen = false) => {
    console.log('Notification processing:', messageReceived);

    if (gotoNavigationScreen) {
        const data = messageReceived.data;
        const noticeData = {
            DataId: parseInt(data.DataId, 10),
            Type: parseInt(data.Type, 10),
        };

        takeActionOnNotification(noticeData);
    }
};

const takeActionOnNotification = (noticeData) => {
    if (noticeData) {
        switch (noticeData.Type) {
            case 1:
                console.log('Notification Type 1 Action');
                break;
            case 2:
                console.log('Notification Type 2 Action');
                break;
            default:
                console.log('Unknown Notification Type');
        }
    }
};
