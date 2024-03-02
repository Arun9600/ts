export const BASE_URL = "https://fakestoreapi.com";

export type Datas = {
  id: number;
  title: string;
  image: string;
  quantity?: number;
  price?: string;
};

export type IDNum = number | null;

export type ProductDatas = {
  title: string;
  image: string;
  price: string;
  category: string;
};

export type Loading = boolean;

export type CartOpen = boolean;
