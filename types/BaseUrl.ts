// Purpose: Interface for the BaseUrl object.
// This object is returned from the API when a new URL is shortened.
export interface BaseUrl {
  id: string;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}
