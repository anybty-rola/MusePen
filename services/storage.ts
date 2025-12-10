import { Draft, FeatureType } from "../types";

const STORAGE_KEY = 'musepen_drafts';

export const saveDraftLocal = (type: FeatureType, content: string): Draft => {
  const drafts = getDraftsLocal();
  const newDraft: Draft = {
    id: Date.now().toString(),
    type,
    content,
    timestamp: Date.now(),
    synced: false,
  };
  
  drafts.unshift(newDraft); // Add to top
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  return newDraft;
};

export const getDraftsLocal = (): Draft[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearLocalDrafts = () => {
    localStorage.removeItem(STORAGE_KEY);
}

export const syncDraftsToCloud = async (): Promise<void> => {
  return new Promise((resolve) => {
    const drafts = getDraftsLocal();
    // Simulate network request
    setTimeout(() => {
        const syncedDrafts = drafts.map(d => ({ ...d, synced: true }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedDrafts));
        resolve();
    }, 1500);
  });
};
