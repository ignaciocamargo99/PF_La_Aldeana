const {
  PayTypesGetDB,
  salePostDB,
  saleDeliveryPostDB,
  SalesGetDB,
  OnSiteSalesGetDB,
} = require("../db/salesDb");

const readPayTypes = async () => {
  try {
    let res = await PayTypesGetDB();
    return res;
  } catch (error) {
    throw Error(error);
  }
};

const readOnSiteSales = async (day) => {
  try {
    let res = await OnSiteSalesGetDB(day);
    return res;
  } catch (error) {
    throw Error(error);
  }
};

const readSales = async (dayInit, dayFinish) => {
  try {
    let res = await SalesGetDB(dayInit, dayFinish);
    return res;
  } catch (error) {
    throw Error(error);
  }
};

const createSale = async (newSale) => {
  try {
    const newSaleId = await salePostDB(newSale);
    return newSaleId;
  } catch (error) {
    throw Error(error);
  }
};

const createSaleDelivery = async (newSale) => {
  try {
    await saleDeliveryPostDB(newSale);
  } catch {
    let res = await saleDeliveryPostDB(newSale);
    throw Error(res);
  }
};

module.exports = {
  readPayTypes,
  createSale,
  createSaleDelivery,
  readOnSiteSales,
  readSales,
};
