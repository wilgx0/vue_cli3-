const path = require('path')

const glob  = require('glob')

const PAGE_PATH  = path.resolve(__dirname,'./pages')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const merge = require('webpack-merge')

//  // 多页面应用配置方案1
// function getEntries () {    // 读取多页应用的入口文件
//
//     let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
//
//     let map = {}
//
//     entryFiles.forEach(filePath => {
//         let filename = filePath.substring(filePath.lastIndexOf('\/')+1,filePath.lastIndexOf('.'))
//
//
//         map[filename] = filePath
//     })
//
//     return map
// }
//
// function htmlPlugin(configs){   //读取多页应用的模板文件
//     let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
//
//     let arr = []
//
//     entryHtml.forEach(filePath=>{
//         let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
//         let conf = {
//             template:filePath,                  // 模板路径
//             filename:filename + '.html',        // 生成 html 的文件名
//             chunks:['manifest','vendor',filename],
//             inject:true
//         }
//
//
//         if (configs) {      // 如果有自定义配置可以进行 merge
//             conf = merge(conf, configs)
//         }
//
//         if(process.env.NODE_ENV === 'production'){
//             conf = merge(conf,{
//                 minify:{
//                     removeComments: true,     // 删除 html 中的注释代码
//                     collapseWhitespace: true, // 删除 html 中的空白符
//                 },
//
//                 chunksSortMode: 'manual' // 按 manual 的顺序引入
//             })
//         }
//
//         arr.push(new HtmlWebpackPlugin(conf))
//
//     })
//
//     return arr
// }
//
//
//
// exports.htmlPlugin = htmlPlugin
//
// exports.getEntries = getEntries


 // 多页面应用配置方案2

exports.setPages = configs => {

    let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    let map = {}

    entryFiles.forEach(filePath => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let tmp = filePath.substring(0, filePath.lastIndexOf('\/'))

        let conf = {
            // page 的入口
            entry: filePath,
            // 模板来源
            template: tmp + '/' +filename +'.html',
            // 在 dist/index.html 的输出
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            //chunks: ['manifest', 'vendor', filename],
            //inject: true,
            chunks: ['chunk-vendors', 'chunk-common', filename]
        }

        if (configs) {
            conf = merge(conf, configs)
        }

        // if (process.env.NODE_ENV === 'production') {
        //     conf = merge(conf, {
        //         minify: {
        //             removeComments: true, // 删除 html 中的注释代码
        //             collapseWhitespace: true, // 删除 html 中的空白符
        //             // removeAttributeQuotes: true // 删除 html 元素中属性的引号
        //         },
        //         chunksSortMode: 'manual'// 按 manual 的顺序引入
        //     })
        // }

        map[filename] = conf
    })

    return map
}

//console.log(exports.setPages())
