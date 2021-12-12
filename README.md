# SVG Quick Editor

[![Build Status](https://github.com/aykutkardas/svg-quick-editor/workflows/build/badge.svg?color=%25234fc921)](https://github.com/aykutkardas/svg-quick-editor/actions)
[![License](https://img.shields.io/badge/License-MIT-green.svg?color=%234fc921)](https://opensource.org/licenses/MIT)

`SVG Quick Editor` is a free and open-source SVG editing tool. It offers features such as editing
SVG colors, viewing or deleting their paths. Files don't have upload and download times, you don't
wait processing times. Everything happens instantly.

## [Go to **SVG Quick Editor**](https://svg-quick-editor.surge.sh/)

![Preview](/preview.png)

## Shortcuts

| Action       | Key                   |
| ------------ | --------------------- |
| Add Files    | `CTRL+O` \| `CMD+O`   |
| Save File    | `CTRL+S` \| `CMD+S`   |
| Close File   | `ALT+Q` \| `OPTION+Q` |
| Import JSON  | `CTRL+I` \| `CMD+I`   |
| Export JSON  | `CTRL+E` \| `CMD+E`   |
| Close Picker | `ESC`                 |

## Development

Pull requests are encouraged and always welcome.
[Pick an issue](https://github.com/aykutkardas/svg-quick-editor/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)
and help us out!

To install and work on `SVG Quick Editor` locally:

```bash
git clone https://github.com/aykutkardas/svg-quick-editor.git
cd svg-quick-editor
yarn
```

> Do not use NPM to install the dependencies, as the specific package versions in `yarn.lock` are
> used to build and test SVG Quick Editor.

You are now ready to develop and watch changes. Running this command will start the project and you
can view it at `http://localhost:3000/`

```bash
yarn start
```

### Running Tests

```bash
yarn test
```

## License

[MIT](LICENSE)
