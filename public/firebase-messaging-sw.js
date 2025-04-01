importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBhCaMrqxHgoVKvLINvD87sYimPIdsN6Kk",
    authDomain: "bku-chicken.firebaseapp.com",
    projectId: "bku-chicken",
    storageBucket: "bku-chicken.firebasestorage.app",
    messagingSenderId: "454828802774",
    appId: "1:454828802774:web:ed41a5f9065d76edb17f77",
    measurementId: "G-YS8EXKL1D4",
    messagingSenderId:"454828802774"
});


const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log('📩 Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
});