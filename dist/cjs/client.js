"use strict";
/**
 * @description
 * After creating a session using functions from the `webdriver` module,
 * a `client` will be returned.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.refesh = exports.printPage = exports.performActions = exports.minimizeWindow = exports.maximizeWindow = exports.isElementSelected = exports.isElementEnabled = exports.isElementDisplayed = exports.getWindowRect = exports.getWindowHandles = exports.getWindowHandle = exports.getUrl = exports.getTitle = exports.getTimeouts = exports.getPageSource = exports.getNamedCookie = exports.getElementText = exports.getElementTagName = exports.getElementRect = exports.getElementProperty = exports.getElementComputedRole = exports.getElementComputedLabel = exports.getElementCSSValue = exports.getElementAttribute = exports.getAllCookies = exports.getAlertText = exports.getActiveElement = exports.fullscreenWindow = exports.forward = exports.findElementsFromElement = exports.findElements = exports.findElementFromElement = exports.findElement = exports.executeScript = exports.executeAsyncScript = exports.elementSendKeys = exports.elementClick = exports.elementClear = exports.dismissAlert = exports.deleteCookie = exports.deleteAllCookies = exports.createWindow = exports.closeWindow = exports.back = exports.addListener = exports.addCookie = exports.acceptAlert = exports.navigateTo = exports.deleteSession = exports.newSession = void 0;
exports.takeScreenshot = exports.takeElementScreenshot = exports.switchToWindow = exports.switchToParentFrame = exports.switchToFrame = exports.status = exports.setWindowRect = exports.setTimeouts = exports.sendAlertText = exports.releaseActions = void 0;
var fp_ts_1 = require("fp-ts");
var function_1 = require("fp-ts/lib/function");
var newSession = function (capabilities) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.newSession(capabilities); }, function_1.identity);
    }));
};
exports.newSession = newSession;
exports.deleteSession = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.deleteSession(); }, function_1.identity);
}));
var navigateTo = function (url) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.navigateTo(url); }, function_1.identity);
    }));
};
exports.navigateTo = navigateTo;
exports.acceptAlert = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.acceptAlert(); }, function_1.identity);
}));
var addCookie = function (cookie) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.addCookie(cookie); }, function_1.identity);
    }));
};
exports.addCookie = addCookie;
var addListener = function (event, listener) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.addListener(event, listener); }, function_1.identity);
    }));
};
exports.addListener = addListener;
exports.back = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.back(); }, function_1.identity);
}));
exports.closeWindow = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.closeWindow(); }, function_1.identity);
}));
var createWindow = function (type) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.createWindow(type); }, function_1.identity);
    }));
};
exports.createWindow = createWindow;
exports.deleteAllCookies = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.deleteAllCookies(); }, function_1.identity);
}));
var deleteCookie = function (name) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.deleteCookie(name); }, function_1.identity);
    }));
};
exports.deleteCookie = deleteCookie;
exports.dismissAlert = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.dismissAlert(); }, function_1.identity);
}));
var elementClear = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.elementClear(elementId); }, function_1.identity);
    }));
};
exports.elementClear = elementClear;
var elementClick = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.elementClick(elementId); }, function_1.identity);
    }));
};
exports.elementClick = elementClick;
var elementSendKeys = function (text) { return function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.elementSendKeys(elementId, text); }, function_1.identity);
    }));
}; };
exports.elementSendKeys = elementSendKeys;
var executeAsyncScript = function (script, args) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.executeAsyncScript(script, args); }, function_1.identity);
    }));
};
exports.executeAsyncScript = executeAsyncScript;
var executeScript = function (script, args) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.executeScript(script, args); }, function_1.identity);
    }));
};
exports.executeScript = executeScript;
var findElement = function (using, value) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.findElement(using, value); }, function_1.identity);
    }));
};
exports.findElement = findElement;
var findElementFromElement = function (elementId, using, value) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.findElementFromElement(elementId, using, value); }, function_1.identity);
    }));
};
exports.findElementFromElement = findElementFromElement;
var findElements = function (using, value) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.findElements(using, value); }, function_1.identity);
    }));
};
exports.findElements = findElements;
var findElementsFromElement = function (elementId, using, value) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.findElementsFromElement(elementId, using, value); }, function_1.identity);
    }));
};
exports.findElementsFromElement = findElementsFromElement;
exports.forward = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.forward(); }, function_1.identity);
}));
exports.fullscreenWindow = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.fullscreenWindow(); }, function_1.identity);
}));
exports.getActiveElement = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getActiveElement(); }, function_1.identity);
}));
exports.getAlertText = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getAlertText(); }, function_1.identity);
}));
exports.getAllCookies = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getAllCookies(); }, function_1.identity);
}));
var getElementAttribute = function (elementId, name) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getElementAttribute(elementId, name); }, function_1.identity);
    }), fp_ts_1.readerTaskEither.map(fp_ts_1.option.fromNullable));
};
exports.getElementAttribute = getElementAttribute;
var getElementCSSValue = function (elementId, getPropertyName) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getElementCSSValue(elementId, getPropertyName); }, function_1.identity);
    }));
};
exports.getElementCSSValue = getElementCSSValue;
var getElementComputedLabel = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getElementComputedLabel(elementId); }, function_1.identity);
    }));
};
exports.getElementComputedLabel = getElementComputedLabel;
var getElementComputedRole = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getElementComputedRole(elementId); }, function_1.identity);
    }));
};
exports.getElementComputedRole = getElementComputedRole;
var getElementProperty = function (elementId, name) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getElementProperty(elementId, name); }, function_1.identity);
    }));
};
exports.getElementProperty = getElementProperty;
var getElementRect = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getElementRect(elementId); }, function_1.identity);
    }));
};
exports.getElementRect = getElementRect;
var getElementTagName = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getElementTagName(elementId); }, function_1.identity);
    }));
};
exports.getElementTagName = getElementTagName;
var getElementText = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getElementText(elementId); }, function_1.identity);
    }));
};
exports.getElementText = getElementText;
var getNamedCookie = function (name) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.getNamedCookie(name); }, function_1.identity);
    }));
};
exports.getNamedCookie = getNamedCookie;
exports.getPageSource = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getPageSource(); }, function_1.identity);
}));
exports.getTimeouts = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getTimeouts(); }, function_1.identity);
}));
exports.getTitle = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getTitle(); }, function_1.identity);
}));
exports.getUrl = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getUrl(); }, function_1.identity);
}));
exports.getWindowHandle = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getWindowHandle(); }, function_1.identity);
}));
exports.getWindowHandles = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getWindowHandles(); }, function_1.identity);
}));
exports.getWindowRect = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.getWindowRect(); }, function_1.identity);
}));
var isElementDisplayed = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.isElementDisplayed(elementId); }, function_1.identity);
    }));
};
exports.isElementDisplayed = isElementDisplayed;
var isElementEnabled = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.isElementEnabled(elementId); }, function_1.identity);
    }));
};
exports.isElementEnabled = isElementEnabled;
var isElementSelected = function (elementId) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.isElementSelected(elementId); }, function_1.identity);
    }));
};
exports.isElementSelected = isElementSelected;
exports.maximizeWindow = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.maximizeWindow(); }, function_1.identity);
}));
exports.minimizeWindow = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.minimizeWindow(); }, function_1.identity);
}));
var performActions = function (actions) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.performActions(actions); }, function_1.identity);
    }));
};
exports.performActions = performActions;
var printPage = function (_a) {
    var orientation = _a.orientation, scale = _a.scale, background = _a.background, width = _a.width, height = _a.height, top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right, shrinkToFit = _a.shrinkToFit, pageRanges = _a.pageRanges;
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () {
            return client.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges);
        }, function_1.identity);
    }));
};
exports.printPage = printPage;
exports.refesh = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.refresh(); }, function_1.identity);
}));
exports.releaseActions = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.releaseActions(); }, function_1.identity);
}));
var sendAlertText = function (text) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.sendAlertText(text); }, function_1.identity);
    }));
};
exports.sendAlertText = sendAlertText;
var setTimeouts = function (_a) {
    var implicit = _a.implicit, pageLoad = _a.pageLoad, script = _a.script;
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.setTimeouts(implicit, pageLoad, script); }, function_1.identity);
    }));
};
exports.setTimeouts = setTimeouts;
var setWindowRect = function (_a) {
    var _b = _a.x, x = _b === void 0 ? null : _b, _c = _a.y, y = _c === void 0 ? null : _c, _d = _a.width, width = _d === void 0 ? null : _d, _e = _a.height, height = _e === void 0 ? null : _e;
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.setWindowRect(x, y, width, height); }, function_1.identity);
    }));
};
exports.setWindowRect = setWindowRect;
exports.status = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.status(); }, function_1.identity);
}));
var switchToFrame = function (id) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.switchToFrame(id); }, function_1.identity);
    }));
};
exports.switchToFrame = switchToFrame;
exports.switchToParentFrame = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.switchToParentFrame(); }, function_1.identity);
}));
var switchToWindow = function (handle) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.switchToWindow(handle); }, function_1.identity);
    }));
};
exports.switchToWindow = switchToWindow;
var takeElementScreenshot = function (elementId, scroll) {
    return function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
        return fp_ts_1.ioEither.tryCatch(function () { return client.takeElementScreenshot(elementId, scroll); }, function_1.identity);
    }));
};
exports.takeElementScreenshot = takeElementScreenshot;
exports.takeScreenshot = function_1.pipe(fp_ts_1.readerTaskEither.ask(), fp_ts_1.readerTaskEither.chainIOEitherK(function (client) {
    return fp_ts_1.ioEither.tryCatch(function () { return client.takeScreenshot(); }, function_1.identity);
}));
