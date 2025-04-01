
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./index";

export const getFCMToken = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_GOOGLEMESSAGE,
        serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
      });
  
      if (currentToken) {
        console.log("✅ FCM Token:", currentToken);
        // 👉 Đây chính là registrationToken để dùng ở server
        return currentToken;
      } else {
        console.warn("⚠️ Không lấy được token. Hãy cấp quyền thông báo.");
      }
    } catch (err) {
      console.error("❌ Lỗi khi lấy token:", err);
    }
};

export const onMessageListener = (handleMessage?: (payload: any) => void) => {
    return new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        
        console.log("📩 Nhận thông báo khi tab đang mở:", payload);
        if (handleMessage) handleMessage(payload);
        resolve(payload);
      });
    });
};

// const messaging = getMessaging();

// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   let self:any 
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
