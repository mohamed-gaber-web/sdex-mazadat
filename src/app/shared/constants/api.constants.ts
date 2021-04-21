const CORS = 'https://cors-anywhere.herokuapp.com/';
export const baseUrl = 'http://ecommerce-api.sdexegypt.com';
export const corsBaseUrl = `http://ecommerce-api.sdexegypt.com`;

// Home
export const homeSliderApi = `api/Sliders/display`;

// About & Contact
export const systemInfoApi = `api/lookups/systeminformation`;

// Biddings
export const biddingsListApi = `api/biddings`;
export const biddingListCategory = `api/categories`;
export const biddingsListFeaturedApi = `${biddingsListApi}/featured`;
export const biddingItemApi = `${biddingsListApi}/view`;
export const biddingSubscribeApi = `${biddingsListApi}/subscribe`;
export const biddingsFilteredApi = `${biddingsListApi}/filterd`;
export const biddingsFilesApi = `${biddingsListApi}/files`;
export const biddingBiddApi = `${biddingsListApi}/bidd`;
export const biddingsPayByCreditCardApi = `${biddingsListApi}/files/payment/creditcard`;
export const biddingsPayByUploadingImageApi = `${biddingsListApi}/files/payment/cheque`;

// export const biddingSubscribeId = `${biddingsListApi}/subscribe`;
export const biddingFaqPage = `api/faqs/display`;
export const signalRApi = `${baseUrl}/biddingHub`;
export const biddingCategoryApi = `${biddingListCategory}/dropdown`;

// User
export const subscribedBiddingsApi = `${biddingsListApi}/user/subscribtions`;

// Account
export const emailVerificationApi = `api/users/confirm`;
export const resendConfirmationLinkApi = `api/users/email/resend`;
