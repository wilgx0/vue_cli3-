const baseUrl = '/mobile/'

const utils = require('./src/utils')

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

//console.log(JSON.stringify( utils.setPages()))

module.exports = {
    publicPath:'mobile',
    devServer: {


        //多页面应用跳转时所需的配置
        /**
         apache 服务器配置文件开启开启  LoadModule rewrite_module modules/mod_rewrite.so
         站点配置开启 Options FollowSymLinks和AllowOverride All
         .htaccess文件示例
         <IfModule mod_rewrite.c>
         RewriteEngine On
         RewriteBase /mobile/
         RewriteRule ^index\.html$ - [L]
         RewriteCond %{REQUEST_FILENAME} !-f
         RewriteCond %{REQUEST_FILENAME} !-d
         RewriteRule ([^\/]*)$ $1.html [L]
         </IfModule>

         */
        historyApiFallback: {
            rewrites: [
                { from: new RegExp(baseUrl + 'page1'), to: baseUrl + 'page1.html' },
                { from: new RegExp(baseUrl + 'page2'), to: baseUrl + 'page2.html' },
            ]
        }
    },

    configureWebpack: config => {


        // //多页面应用配置方案1
        // config.entry = utils.getEntries() // 直接覆盖 entry 配置
        //
        //
        // return {    // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
        //     plugins: [...utils.htmlPlugin()]
        // }
    },


    //多页面应用配置方案2
    pages: utils.setPages(),



    //手动配置3
    // pages: {
    //     index:{
    //         // page 的入口
    //         entry: './src/pages/index/index.js',
    //         // 模板来源
    //         template: './index.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'index',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     page1: {
    //         // page 的入口
    //         entry: './src/pages/page1/page1.js',
    //         // 模板来源
    //         template: './page1.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'page1.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'index',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'page1']
    //     },
    //     page2: {
    //         // page 的入口
    //         entry: './src/pages/page2/page2.js',
    //         // 模板来源
    //         template: './page2.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'page2.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'index',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'page2']
    //     },
    //
    // },


    //移动端适配
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                        // 该项仅在使用 Circle 组件时需要
                        // 原因参见 https://github.com/youzan/vant/issues/1948
                        selectorBlackList: ['van-circle__layer']
                    })
                ]
            }
        }
    },

}