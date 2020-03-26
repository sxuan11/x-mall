module.exports = {
  // publicPath : '/',
  devServer:{
    proxy:{
      '/sxsx':{
        target:'http://47.102.100.226:3030/sxsx',
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/sxsx': ''
        }
      }
    }
  },
  // devServer:{
  //   proxy:{
  //     '/sxsx':{
  //        target:'http://47.102.100.226:3030/sxsx',
  //        ws:true,
  //        changeOrigin:true,
  //        pathRewrite:{
  //           '^/sxsx': '',
  //        }     
  //      }
  //   }
  // }
};