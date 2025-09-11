import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as aesjs from "aes-js";
import { Platform } from "react-native";
import "react-native-get-random-values";

// Large Secure Store implementation from:
// https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=secure-store

interface IStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

class AsyncStorageAdapter implements IStorage {
  async getItem(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}

class LocalStorageAdapter implements IStorage {
  async getItem(key: string): Promise<string | null> {
    return Promise.resolve(localStorage.getItem(key));
  }

  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
    return Promise.resolve();
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
    return Promise.resolve();
  }
}

class LargeSecureStore {
  private storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  private async _encrypt(key: string, value: string): Promise<string> {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1),
    );
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(
      key,
      aesjs.utils.hex.fromBytes(encryptionKey),
    );
    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  private async _decrypt(key: string, value: string): Promise<string | null> {
    const encryptionKeyHex = await SecureStore.getItemAsync(key);
    if (!encryptionKeyHex) return null;

    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1),
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async getItem(key: string): Promise<string | null> {
    const encrypted = await this.storage.getItem(key);
    if (!encrypted) return null;
    return await this._decrypt(key, encrypted);
  }

  async setItem(key: string, value: string): Promise<void> {
    const encrypted = await this._encrypt(key, value);
    await this.storage.setItem(key, encrypted);
  }

  async removeItem(key: string): Promise<void> {
    await this.storage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }
}

const storageAdapter =
  Platform.OS === "web"
    ? new LargeSecureStore(new LocalStorageAdapter())
    : new LargeSecureStore(new AsyncStorageAdapter());

export default storageAdapter;
