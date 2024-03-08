type ShopType = {
  shopId: string;
  shopName: string;
  shopGroup: string;
  shopNo: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  isOwn: boolean;
  commonItem?: CommonItemType;
  chargePersons?: ChargePersonType[];
};

type ChargePersonType = {
  chargePersonId: string;
  shop?: ShopType;
  user?: UserType;
  commonItem?: CommonItemType;
};

type UserType = {
  userId: string;
  password: string;
  userName: string;
  userNameKana: string;
  allowLogin: boolean;
  roleId: string;
  commonItem?: CommonItemType;
  shop?: ShopType;
};
