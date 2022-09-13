const {defineConfig} = require('@vue/cli-service')
// const pxtovw = require('postcss-px-to-viewport')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  // css:{
  //   loaderOptions:{
  //     sass:{
  //       //给sass-loader传递选项
  //     },
  //     css:{
  //       //给css-loader传递选项
  //     },
  //     postcss:{
  //       //给postcss-loader传递选项
  //       plugins:[
  //         new pxtovw({
  //           viewportWidth: 375,
  //           viewportHeight: 667,
  //           unitPrecision: 5,
  //           viewportUnit: 'vw',
  //           selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
  //           minPixelValue: 1,
  //           mediaQuery: false,
  //           exclude:['TabBarItem.vue']
  //         })
  //       ]
  //     }
  //   }
  // }
})
