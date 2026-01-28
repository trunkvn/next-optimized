// src/lib/storage/versioned-storage.ts

const APP_STORAGE_VERSION = "2.0"; // Increment this to clear/migrate old data

export const versionedStorage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    
    const raw = localStorage.getItem(`${key}_v${APP_STORAGE_VERSION}`);
    if (!raw) {
      // Logic for version migration could go here:
      // if (localStorage.getItem(`${key}_v1.0`)) { ... migrate ... }
      return null;
    }
    
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(`${key}_v${APP_STORAGE_VERSION}`, JSON.stringify(value));
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`${key}_v${APP_STORAGE_VERSION}`);
  }
};
