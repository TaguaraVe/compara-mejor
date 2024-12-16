interface User {
  id: string;
  name: string;
  email: string;
  user_role: string;
}

interface XanaPros {
  codeCM: string | null;
  barcodeCM: string | null;
  nameCM: string | null;
}

interface DataItem {
  id: number;
  new_code: string;
  product_name: string;
  product_brand: string | null;
  product_presentation: string | null;
  product_units: number | null;
  date: string | Date;
  mercado: string;
  price: number;
  priceBs: number;
  tag_promo: string | null;
}

interface PriceData {
  id: number;
  new_code: string;
  barcode?: string;
  product_name: string;
  product_brand?: string;
  product_presentation?: string;
  product_units?: number;
  date: string | Date;
  mercado: string;
  market_code: string;
  price: number;
  priceBs: number;
  tag_promo: string | null;
}

interface DataItem {
  new_code: string;
  date: string | Date;
  price: number;
  priceBs: number;
}

interface Details {
  mercado: string;
  price: number;
  priceBs: number;
}

interface GroupedDataItem {
  date: string | Date;
  new_code: string;
  barcode?: string;
  product_name?: string;
  product_brand?: string;
  product_presentation?: string;
  product_units?: number;
  priceXana: number;
  priceMax: number;
  priceMin: number;
  priceAvg: number;
  priceXanaBs: number;
  priceAvgBs: number;
  priceMaxBs: number;
  priceMinBs: number;
  priceAvgBs: number;
  details: Details[];
}
