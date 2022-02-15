## Modern Vue

Am-editor for Vue3 with example and component-toolbar(wip).

<div align="center">
  <p>
    <a href="README_zh-CN.md">
      <img src="https://img.shields.io/badge/lang-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-red.svg?longCache=true&style=flat-square">
    </a>
  </p>
</div>

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

rush rebuild -T example

cd apps/example

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
