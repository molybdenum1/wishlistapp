export interface IWishlistItem {
  id: string;
  name: string;
  description: string;
  price: number;
  link?: string;
}

export interface IWishlistGroup {
  id: string;
  name: string;
  items: IWishlistItem[];
}

export interface IGroup {
  title: string;
  description: string;
  ownerId: string;
  sharedWith: string[];
  createdAt: Date;
}
