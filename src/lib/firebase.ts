import { getApps, getApp, initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'
import { nanoid } from 'nanoid';
import * as Location from 'expo-location';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const firestore = getFirestore(app)

const getCurrentLocation = async (): Promise<{
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
  mocked?: boolean;
}> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }
  const location = await Location.getCurrentPositionAsync({});
  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
    accuracy: location.coords.accuracy ?? 0,
    timestamp: location.timestamp,
    mocked: location.mocked,
  };
};

type RideDestination = {
  lat: number;
  lng: number;
  label: string;
};

type Member = {
  userId: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    accuracy: number;
    timestamp: number;
    mocked?: boolean;
  } | null;
};

export const createRide = async ({
  hostId,
  hostName,
  destination,
}: {
  hostId: string;
  hostName: string;
  destination: RideDestination;
}) => {
  const rideId = nanoid(6).toUpperCase();
  const rideRef = doc(firestore, 'rides', rideId);

  const location = await getCurrentLocation();

  await setDoc(rideRef, {
    rideId,
    hostId,
    destination,
    members: [
      {
        userId: hostId,
        name: hostName,
        location,
      },
    ],
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return rideId;
};

export const joinRide = async ({
  rideId,
  userId,
  name,
}: {
  rideId: string;
  userId: string;
  name: string;
}) => {
  const rideRef = doc(firestore, 'rides', rideId);
  const snap = await getDoc(rideRef);

  if (!snap.exists()) throw new Error('Ride not found');

  const location = await getCurrentLocation();

  await updateDoc(rideRef, {
    members: arrayUnion({
      userId,
      name,
      location,
    }),
    updatedAt: serverTimestamp(),
  });
};