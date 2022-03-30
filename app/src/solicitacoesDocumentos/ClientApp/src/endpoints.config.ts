// /// <reference types="react-scripts" />
// declare global {
//     namespace NodeJS {
//       interface ProcessEnv {
//         GITHUB_AUTH_TOKEN: string;
//         NODE_ENV: 'development' | 'production';
//         PORT?: string;
//         PWD: string;
//       }
//     }
//   }

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
// export {}
// Contents of src/config.ts

// import { config as configDotenv } from 'dotenv'
// import { resolve } from 'path'

// switch (process.env.NODE_ENV) {
//   case 'development':
//     console.log("Environment is 'development'")
//     configDotenv({
//       path: resolve(__dirname, '../.env.development')
//     })
//     break
//   case 'test':
//     configDotenv({
//       path: resolve(__dirname, '../.env.test')
//     })
//     break
//   // Add 'staging' and 'production' cases here as well!
//   default:
//     throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
// }
export default {
  // UserBaseUrl: process.env.USER_SERVICE_URL ?? 'https://localhost:5001',
  // EtlUrl: process.env.ETL_SERVICE_URL ?? 'https://localhost:5001',
  UserBaseUrl: process.env.USER_SERVICE_URL ?? 'http://192.168.2.240:8095',
  EtlUrl: process.env.ETL_SERVICE_URL ?? 'http://192.168.2.240:8095',
};
