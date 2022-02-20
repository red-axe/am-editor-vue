## Modern Vue

Am-editor for vue with example and toolbar(wip).

<p align='center'>
<b>English</b> | <a href="https://github.com/byoungd/am-editor-vue/blob/main/README.zh-CN.md">简体中文</a>
</p>

![](assets/editor.png)

## Usage

> Requires Node >=14

### Development

Install Rush tool kit:

```bash
npm i -g pnpm typescript eslint@7 @microsoft/rush prettier
```

Go project folder and using `rushx` run and visit `http://localhost:3333` :

```bash
rush update

rush rebuild -T editor

cd packages/editor

rushx dev
```

### Build

To build the App, run

```bash
cd apps/example

rushx build
```

With Env:

```bash
rushx build:test
```

And you will see the generated file in `dist` that ready to be served.

## Final

enjoy :)
