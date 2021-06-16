# testcafe-reporter-xray-cloud-json

This is the **xray-cloud-json** reporter plugin for [TestCafé](http://devexpress.github.io/testcafe).

![preview image](https://raw.github.com/paulmedwards/testcafe-reporter-xray-cloud-json/master/media/preview.png)

## Install

```text
npm install testcafe-reporter-xray-cloud-json
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```text
testcafe chrome 'path/to/test/file.js' --reporter xray-cloud-json
```

When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('xray-cloud-json') // <-
    .run();
```

## Authors

- [Paul M Edwards](https://github.com/PaulMEdwards)
- [Mohammed Boukhenaif](https://github.com/s1mob)
- [Antonio Reyes](https://github.com/antreyes)
