## [3.1.1-next.1](https://github.com/waynevanson/fp-ts-webdriver/compare/v3.1.0...v3.1.1-next.1) (2021-02-20)


### Bug Fixes

* removes PUT and UPDATE from RequestMethod type ([47b3399](https://github.com/waynevanson/fp-ts-webdriver/commit/47b3399c0c3d51f0d502d9a2ce95ee71dc074c00))

# [3.1.0](https://github.com/waynevanson/fp-ts-webdriver/compare/v3.0.0...v3.1.0) (2021-02-20)


### Features

* adds performActions for NullActions ([3ad7557](https://github.com/waynevanson/fp-ts-webdriver/commit/3ad7557231217f2aed5d3b9509144238a15dbb3a))

# [3.0.0](https://github.com/waynevanson/fp-ts-webdriver/compare/v2.0.0...v3.0.0) (2021-02-18)


### Code Refactoring

* renames url to endpoint ([9f53f01](https://github.com/waynevanson/fp-ts-webdriver/commit/9f53f013baec8bd636070a038a119ab444bad40a))
* renames WebdriverProps to MakeProps ([f11d474](https://github.com/waynevanson/fp-ts-webdriver/commit/f11d474c98b47d0011746098b44921dc6d824fcc))


### BREAKING CHANGES

* Renames WebdriverProps to MakeProps
* Renames url to endpoint in Dependencies type

# [2.0.0](https://github.com/waynevanson/fp-ts-webdriver/compare/v1.5.0...v2.0.0) (2021-02-17)


### Build System

* build script amends dist folder ([610281e](https://github.com/waynevanson/fp-ts-webdriver/commit/610281e3152373cb77397e4804e6ccdd69ee5e1e))


### BREAKING CHANGES

* files were not being removed before overwritten, so all the old dist files from previous versions were still available for use by users.

# [1.5.0](https://github.com/waynevanson/fp-ts-webdriver/compare/v1.4.0...v1.5.0) (2021-02-16)


### Features

* **command:** adds elementSendKeys ([d770a03](https://github.com/waynevanson/fp-ts-webdriver/commit/d770a03e77ad8da30c3af331690b8234a2f5e567))
* **command:** adds getElementAttribute ([b13ba2d](https://github.com/waynevanson/fp-ts-webdriver/commit/b13ba2d25aa5e2d8ed78fac6663d34dd70d84152))
* **command:** adds refresh ([d5a8aca](https://github.com/waynevanson/fp-ts-webdriver/commit/d5a8aca7743114f8aadfe852c28ec6d771f00086))
* adds findElement ([3a92ede](https://github.com/waynevanson/fp-ts-webdriver/commit/3a92edea079bea1e3fad7c9b452f41ce7f4b9822))

# [1.4.0](https://github.com/waynevanson/fp-ts-webdriver/compare/v1.3.0...v1.4.0) (2021-02-16)


### Features

* adds forward ([d576489](https://github.com/waynevanson/fp-ts-webdriver/commit/d576489a180767b09e08b3005c5c7c6e67391485))

# [1.3.0](https://github.com/waynevanson/fp-ts-webdriver/compare/v1.2.0...v1.3.0) (2021-02-16)


### Features

* adds setTimeouts ([e02682e](https://github.com/waynevanson/fp-ts-webdriver/commit/e02682e2847f8219273af5484cb2734e5ef1a821))

# [1.2.0](https://github.com/waynevanson/fp-ts-webdriver/compare/v1.1.0...v1.2.0) (2021-02-16)


### Features

* adds getTimeouts ([aefe855](https://github.com/waynevanson/fp-ts-webdriver/commit/aefe855554ffbb0a21c2fa92ddd92fd54c75051d))
