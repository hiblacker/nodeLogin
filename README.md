# VUE项目配置

> 在vue-cli webpack基础上修改
```
vue-cli:2.9.3
```

## 主要修改

### 增加别名

```
// ./build/webpack.base.conf.js
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
      'view': resolve('src/view'),
      'components': resolve('src/components'),
      'img': resolve('src/assets/img'),
      'css': resolve('src/assets/css')
    }
  }
```
### 删除build后的.map文件

```
// ./config/index.js
    /**
     * Source Maps
     */

    productionSourceMap: false,
```

### src下目录结构修改

见src文件

### 路由懒加载

```
// ./src/router/router.js
{
    path: '/',
    name: 'HelloWorld',
    component: () => import ('components/HelloWorld')
}
```

### 使用less
```
// package.json

    "less": "^3.0.1",
    "less-loader": "^4.1.0",
```
### 增加less全局变量支持
TODO: 热更新
