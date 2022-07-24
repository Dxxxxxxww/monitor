# monorepo 踩坑记录

## Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)

需要使用 @rollup/plugin-typescript 插件

```js
{
  //  ...
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ]
}
```

## Could not find module 'tslib', which is required by this plugin

使用 @rollup/plugin-typescript 需要额外安装一个 tslib 的库，这在 @rollup/plugin-typescript 文档中有说明。

## 
