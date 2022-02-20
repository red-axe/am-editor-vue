## Modern Vue

Am-editor vue 组件。

![](assets/editor.png)

## Usage

> Node 版本 >=14

### 开发

安装全局依赖:

```bash
npm i -g pnpm typescript eslint@7 @microsoft/rush prettier
```

进入项目目录并使用 `rushx`启动 然后浏览器访问 `http://localhost:3333` :

```bash
rush update

rush rebuild -T editor

cd packages/editor

rushx dev
```

### 打包

打包应用使用如下命令:

```bash
cd apps/example

rushx build
```

With Env:

```bash
rushx build:test
```

## 最后

enjoy :)
