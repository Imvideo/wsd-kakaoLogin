const { defineConfig } = require('@vue/cli-service');
const dotenv = require('dotenv');
const path = require('path');

// 환경 변수 로드
const env = process.env.NODE_ENV === 'production' ? '.env-prod' : '.env-dev';
dotenv.config({ path: path.resolve(__dirname, env) });

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT || 8080,
    host: process.env.VUE_APP_IP_ADDRESS || 'localhost',
  },
});
