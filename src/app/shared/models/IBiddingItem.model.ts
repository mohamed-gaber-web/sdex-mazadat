import { IBiddingTranslation } from './bidding-translation.model';

export class IBiddingItem {
  id: number;
  isActive: boolean;
  startPricie: number;
  minimumPrice: number;
  address: null;
  lat: string;
  long: string;
  category: string;
  categoryId: number;
  highestBiddingPrice: number;
  isHighestBidder: boolean;
  isFeatured: boolean;
  biddingItemStatusId: number;
  biddingId: number;
  biddingItemTranslations: IBiddingTranslation[];
  imagesUrl: [];
  files: [];
}
