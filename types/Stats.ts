export interface shortUrlStats {
  totalAccessCount: number;
  uniqueIPCount: number;
  lastAccessed: string;
  locationStats: Array<{
    country: string;
    city?: string;
    count: number;
    flags?: {
      img: string;
      emoji: string;
      emojiUnicode?: string;
    };
  }>;
  referrerStats: Array<groupData>;
  osStats: Array<groupData>;
  deviceStats: Array<groupData>;
  browserStats: Array<groupData>;
  lastAccessDevice: {
    deviceType: string;
    os: string;
    browser: string;
  };
}

export type comboBoxUrlStats = {
  label: string;
  shortCode: string;
};

export type groupData = {
  key: string;
  count: number;
};
