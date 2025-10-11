// import type { ProductType } from '#app/generated/prisma/enums.js';

// // export type ProductTypeTotalByMonthModel = {
// //   id: string;
// //   name: string;
// //   month: number; // 0-11 for Jan-Dec
// //   total: number;
// // };

// type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

// export type ProductTypeTotalByMonthModel = Record<
//   ProductType, // productType id/name (e.g. 'DRESS')
//   Record<
//     Month, // month number 0-11
//     number // total for that productType/month
//   >
// >;

export type ProductTypeTotalByMonthModel = {
  id: string; // product type id (e.g. 'DRESS')
  name: string; // product type display name
  month: number; // 0-11
  total: number; // total sales for that product type & month
};
