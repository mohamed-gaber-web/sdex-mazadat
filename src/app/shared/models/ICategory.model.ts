
export class ICategory {
  id?: number;
  categoryTranslations: [
    {
      description: string;
      id: number;
      languageCode: string;
      name: string
    }
  ];
  code: string;
  fileUrl: string;
  isTopLevel: boolean;
  numberOfBiddings: number;
  order: number;
  subCategories: []
}
