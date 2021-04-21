import { IBiddingTranslation } from './bidding-translation.model';
import { IBiddingItem } from './IBiddingItem.model';

export class IBidding {
  id?: number;
  actions: string[];
  startDate: string;
  endDate: string;
  paymentStartDate: string;
  remainingSeconds: string;
  paymentEndDate: string;
  isInsurance: boolean;
  isConditions: boolean;
  insuranceValue: string;
  insurancePaid: boolean;
  conditionValue: string;
  conditionsPaid: boolean;
  validToBidd: boolean;
  isFeatured: boolean;
  numberOfValidUsersToBidd: number;
  allowedOnlyForSubscribers: boolean;
  biddingSubValueId: number;
  biddingSubValue: {
    id: number;
    title: string;
  };
  conditionFile: string;
  insuranceFile: string;
  termsAndCondtions: string;
  biddingStatusId: string;
  subscribed: boolean;
  imageUrl: string;
  itemsIds: number[];
  status: string;
  file: string;
  biddingTranslations: IBiddingTranslation[];
  biddingItems: IBiddingItem[];
}
