export interface IWishlistItem {
  id: number;
  name: string;
  description: string;
  price: number;
  link?: string;
}

export interface IWishlistGroup {
  id: number;
  name: string;
  items: IWishlistItem[];
}
