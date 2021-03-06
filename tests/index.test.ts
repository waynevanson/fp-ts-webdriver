import {
  either as E,
  readerTaskEither as RTE,
  readonlyRecord as RORC,
  taskEither as TE,
} from "fp-ts"
import { constVoid, identity, pipe } from "fp-ts/lib/function"
import { readerReaderTaskEither as RRTE, webdriver as WD } from "../src"
import { chromedriverJestSetup } from "./chromedriver"

const delay = (timeout: number) =>
  pipe(
    () =>
      new Promise<void>((res) =>
        setTimeout(() => {
          res()
        }, timeout)
      ),
    TE.fromTask,
    RTE.fromTaskEither,
    RRTE.fromReaderTaskEither
  ) as WD.WebdriverSession<void>

const port = 4444
const dependencies: WD.Dependencies = { endpoint: `http://localhost:${port}` }

// runs in headless!
const capabilities: WD.Capabilities = {
  alwaysMatch: {
    "goog:chromeOptions": { args: ["--headless"] },
  },
}

const body = { capabilities }

const runTest = <A>(fa: WD.WebdriverSession<A>) =>
  pipe(fa, WD.runSession(body))(dependencies)

// increase this if tests timeout
jest.setTimeout(30000)

describe("webdriver", () => {
  // engage jest hooks for the chromedriver.
  chromedriverJestSetup(port)()

  describe("Sessions", () => {
    describe("newSession/deleteSession", () => {
      test("creates and deletes a new session", async () => {
        const result = await pipe(
          WD.newSession(body),
          RTE.chain(WD.deleteSession)
        )(dependencies)()

        expect(result).toMatchObject(E.right(constVoid()))
      })
    })

    describe("status", () => {
      test("status returns ready when a window is made", async () => {
        const result = await pipe(() => WD.status, runTest)()

        expect(result).toMatchObject(
          E.right({
            message: "ChromeDriver ready for new sessions.",
            ready: true,
          })
        )
      })

      test("status returns ready when there is no session active", async () => {
        const result = await WD.status(dependencies)()

        expect(result).toMatchObject(
          E.right({
            message: "ChromeDriver ready for new sessions.",
            ready: true,
          })
        )
      })
    })
  })

  describe("Navigation", () => {
    describe("navigateTo", () => {
      test("navigateTo", async () => {
        const result = await pipe(
          WD.navigateTo("https://google.com.au"),
          runTest
        )()

        expect(result).toMatchObject(E.right(constVoid()))
      })
    })

    describe("Timeouts", () => {
      describe("getTimeouts", () => {
        test("get the default timeouts for the page", async () => {
          const result = await pipe(WD.getTimeouts, runTest)()

          expect(result).toMatchObject(
            E.right({
              implicit: 0,
              pageLoad: 300000,
              script: 30000,
            })
          )
        })
      })
    })

    describe("setTimeouts", () => {
      test("sets the timeouts, ensuring they've changed", async () => {
        const timeouts = {
          implicit: 0,
          pageLoad: 40000,
          script: 40000,
        }

        const result = await pipe(
          WD.setTimeouts(timeouts),
          RRTE.chain(() => WD.getTimeouts),
          runTest
        )()

        expect(result).toMatchObject(E.right(timeouts))
      })
    })
  })

  describe("Navigation", () => {
    describe("getCurrentUrl", () => {
      test("gets the current url", async () => {
        const url = "https://www.google.com.au/"

        const result = await pipe(
          WD.navigateTo(url),
          RRTE.chain(() => WD.getCurrentUrl),
          runTest
        )()

        expect(result).toMatchObject(E.right(url))
      })
    })

    describe("back", () => {
      test("navigate to 2 urls and navigates back to the 1st", async () => {
        const urlA = "https://www.google.com.au/"
        const urlB = "https://www.youtube.com/"
        const result = await pipe(
          WD.navigateTo(urlA),
          RRTE.chain(() => WD.navigateTo(urlB)),
          RRTE.chain(() => WD.back),
          RRTE.chain(() => WD.getCurrentUrl),
          runTest
        )()

        expect(result).toMatchObject(E.right(urlA))
      })
    })

    describe("forward", () => {
      test("navigate to 2 urls, then back, then forward", async () => {
        const urlA = "https://www.google.com.au/"
        const urlB = "https://www.youtube.com/"
        const result = await pipe(
          WD.navigateTo(urlA),
          RRTE.chain(() => WD.navigateTo(urlB)),
          // RRTE.chainFirst(() => delay(1000)),
          RRTE.chain(() => WD.back),
          // RRTE.chainFirst(() => delay(1000)),
          RRTE.chain(() => WD.forward),
          // RRTE.chainFirst(() => delay(1000)),
          RRTE.chain(() => WD.getCurrentUrl),
          runTest
        )()

        expect(result).toMatchObject(E.right(urlB))
      })
    })

    describe("refresh", () => {
      test("go to a page, type in the box and refresh to see it gone", async () => {
        const urlA = "https://www.google.com.au/"
        const searchBar = WD.findElement("css selector", 'input[name="q"]')
        const searchBarText = WD.getElementAttribute("value")
        const text = "Hello, World!"

        const result = await pipe(
          WD.navigateTo(urlA),
          RRTE.chain(() => searchBar),
          RRTE.chainFirst(WD.elementSendKeys(text)),
          RRTE.chainFirst(() => WD.refresh),
          // get element again because element hash has changed
          RRTE.chain(() => searchBar),
          RRTE.chain(searchBarText),
          runTest
        )()

        expect(result).toMatchObject(E.right(""))
      })
    })

    describe("getTitle", () => {
      const urlA = "https://www.google.com.au/"
      test("title is `Google`", async () => {
        const result = await pipe(
          WD.navigateTo(urlA),
          RRTE.chain(() => WD.getTitle),
          runTest
        )()

        expect(result).toMatchObject(E.right("Google"))
      })
    })
  })

  describe("Element Interaction", () => {
    describe("elementSendKeys", () => {
      test("sends keys to a search bar", async () => {
        const searchBar = WD.findElement("css selector", 'input[name="q"]')
        const searchBarText = WD.getElementAttribute("value")

        const text = "Hello, World!"

        const result = await pipe(
          WD.navigateTo("https://www.google.com.au/"),
          RRTE.chain(() => searchBar),
          RRTE.chainFirst(WD.elementSendKeys(text)),
          RRTE.chain(searchBarText),
          runTest
        )()

        expect(result).toMatchObject(E.right(text))
      })
    })
  })

  describe("Element Retrieval", () => {
    describe("findElement", () => {
      test("finds css element", async () => {
        const searchBar = WD.findElement("css selector", 'input[name="q"]')

        const test = pipe(
          WD.navigateTo("https://www.google.com.au/"),
          RRTE.chain(() => searchBar)
        )

        const result = await pipe(test, WD.runSession(body))(dependencies)()
        expect(result).toHaveProperty([
          "right",
          "element-6066-11e4-a52e-4f735466cecf",
        ])
      })
    })

    describe("getElementAttribute", () => {
      test("gets an attribute of an element", async () => {
        const searchButton = WD.findElement(
          "css selector",
          'input[value="Google Search"]'
        )

        const attribute = WD.getElementAttribute("value")

        const test = pipe(
          WD.navigateTo("https://www.google.com.au/"),
          RRTE.chain(() => searchButton),
          RRTE.chain(attribute)
        )

        const result = await pipe(test, WD.runSession(body))(dependencies)()
        expect(result).toMatchObject(E.right("Google Search"))
      })
    })

    describe("getElementRect", () => {
      const searchBar = WD.findElement("css selector", 'input[name="q"]')

      test("retrieve the rectangle", async () => {
        const result = await pipe(
          WD.navigateTo("https://www.google.com.au/"),
          RRTE.chain(() => searchBar),
          RRTE.chain(WD.getElementRect),
          WD.runSession(body)
        )(dependencies)()
        expect(result).toMatchObject(
          E.right({
            height: 34,
            width: 487,
            x: 156,
            y: 183.5,
          })
        )
      })
    })
  })

  describe("Actions", () => {
    describe("performActions", () => {
      describe("null actions", () => {
        test("duration is a number greater than 0", async () => {
          const result = await pipe(
            WD.performActions([
              {
                id: "1212",
                type: "none",
                actions: [{ type: "pause", duration: 1000 }],
              },
            ]),
            runTest
          )()
          expect(result).toMatchObject(E.right(constVoid()))
        })

        test("duration is 0", async () => {
          const result = await pipe(
            WD.performActions([
              {
                id: "1212",
                type: "none",
                actions: [{ type: "pause", duration: 0 }],
              },
            ]),
            runTest
          )()

          expect(result).toMatchObject(E.right(constVoid()))
        })

        test("duration is undefined", async () => {
          const result = await pipe(
            WD.performActions([
              {
                id: "1212",
                type: "none",
                actions: [{ type: "pause" }],
              },
            ]),
            runTest
          )()

          expect(result).toMatchObject(E.right(constVoid()))
        })
      })

      describe("pointer actions", () => {
        describe("ActionItemPointerUpDown", () => {
          test("expect to pass", async () => {
            const result = await pipe(
              WD.performActions([
                {
                  id: "1",
                  actions: [
                    { type: "pointerDown", button: 0 },
                    { type: "pointerUp", button: 0 },
                  ],
                  type: "pointer",
                  parameters: { pointerType: "mouse" },
                },
              ]),
              runTest
            )()

            expect(result).toMatchObject(E.right(constVoid()))
          })
        })

        describe("ActionItemPointerMove", () => {
          test("issue pointer move actions", async () => {
            const result = await pipe(
              WD.performActions([
                {
                  actions: [
                    {
                      type: "pointerMove",
                      origin: "viewport",
                      x: 100,
                      y: 100,
                      duration: 1000,
                    },
                    {
                      type: "pointerMove",
                      x: 200,
                      y: 200,
                      duration: 1000,
                      origin: "pointer",
                    },
                    {
                      type: "pointerMove",
                      x: 100,
                      y: 100,
                      duration: 1000,
                      origin: "viewport",
                    },
                  ],
                  type: "pointer",
                  id: "1",
                  parameters: { pointerType: "touch" },
                },
              ]),
              runTest
            )()

            expect(result).toMatchObject(E.right(constVoid()))
          })
        })

        describe("ActionItemPointerCancel", () => {
          test("", async () => {
            const result = await pipe(
              WD.performActions([
                {
                  type: "pointer",
                  id: "1",
                  actions: [{ type: "pointerCancel" }],
                  parameters: { pointerType: "mouse" },
                },
              ]),
              runTest
            )()

            expect(result).toMatchObject(E.right(constVoid()))
          })
        })

        describe("ActionItemPointerPause", () => {
          test("", async () => {
            const result = await pipe(
              WD.performActions([
                {
                  id: "1",
                  type: "pointer",
                  parameters: { pointerType: "mouse" },
                  actions: [{ type: "pause", duration: 1000 }],
                },
              ]),
              runTest
            )()
            expect(result).toMatchObject(E.right(constVoid()))
          })
        })
      })
    })

    describe("KeyActions", () => {
      describe("keyActionUpDown", () => {
        test("", async () => {
          const result = await pipe(
            WD.performActions([
              {
                type: "key",
                id: "2",
                actions: [
                  { type: "keyDown", value: "a" },
                  { type: "keyUp", value: "a" },
                ],
              },
            ]),
            runTest
          )()
          expect(result).toMatchObject(E.right(constVoid()))
        })
      })

      describe("keyActionPause", () => {
        test("", async () => {
          const result = await pipe(
            WD.performActions([
              {
                type: "key",
                id: "2",
                actions: [{ type: "pause" }],
              },
            ]),
            runTest
          )()
          expect(result).toMatchObject(E.right(constVoid()))
        })
      })
    })
  })

  describe("releaseActions", () => {
    test("", async () => {
      const result = await pipe(WD.releaseActions, runTest)()
      expect(result).toMatchObject(E.right(constVoid()))
    })
  })

  describe("combinators", () => {
    describe("drag and drop", () => {
      const from = WD.findElement("css selector", "#src_move")
      const to = WD.findElement("css selector", "#dest_move")

      const fromto = pipe({ from, to }, RORC.traverse(RRTE.MonadSeq)(identity))

      const url =
        "https://mdn.github.io/dom-examples/drag-and-drop/copy-move-DataTransfer.html"
      test.only("drag and drop", async () => {
        const result = await pipe(
          WD.navigateTo(url),
          RRTE.chain(() => fromto),
          RRTE.chain(({ from, to }) => WD.dragAndDrop(from, to)),
          RRTE.chain(() => WD.getPageSource),
          runTest
        )()
        // not right
        expect(result).toMatchInlineSnapshot(`
          Object {
            "_tag": "Right",
            "right": "<html lang=\\"en\\"><head>
          <title>Using Drag and Drop API to copy and move elements</title>
          <!-- 
             This example demonstrates using various HTML Drag and Drop interfaces including:
             * Global \\"draggable\\" attribute
             * Event handlers for dragstart, dragover and drop
             * Global event handlers for ondragstart, ondragover and ondrop
             * Using the DataTransfer interface to copy and move elements (<div>)
          -->
          <style>
            div {
              margin: 0em;
              padding: 2em;
            }
            #src_copy, #src_move  {
              color: blue;
              border: 5px solid black;
              width: 300px;
              height: 50;
            }
            #dest_copy, #dest_move {
              border: 5px solid blue;
              width: 300px;
              height: 50;
            }
          </style>
          <script>
          function dragstart_handler(ev) {
           console.log(\\"dragStart\\");
           // Change the source element's background color to signify drag has started
           ev.currentTarget.style.border = \\"dashed\\";
           // Add the id of the drag source element to the drag data payload so
           // it is available when the drop event is fired
           ev.dataTransfer.setData(\\"text\\", ev.target.id);
           // Tell the browser both copy and move are possible
           ev.effectAllowed = \\"copyMove\\";
          }
          function dragover_handler(ev) {
           console.log(\\"dragOver\\");
           // Change the target element's border to signify a drag over event
           // has occurred
           ev.currentTarget.style.background = \\"lightblue\\";
           ev.preventDefault();
          }
          function drop_handler(ev) {
            console.log(\\"Drop\\");
            ev.preventDefault();
            // Get the id of drag source element (that was added to the drag data
            // payload by the dragstart event handler)
            var id = ev.dataTransfer.getData(\\"text\\");
            // Only Move the element if the source and destination ids are both \\"move\\"
            if (id == \\"src_move\\" && ev.target.id == \\"dest_move\\")
              ev.target.appendChild(document.getElementById(id));
            // Copy the element if the source and destination ids are both \\"copy\\"
            if (id == \\"src_copy\\" && ev.target.id == \\"dest_copy\\") {
             var nodeCopy = document.getElementById(id).cloneNode(true);
             nodeCopy.id = \\"newId\\";
             ev.target.appendChild(nodeCopy);
            }
          }
          function dragend_handler(ev) {
            console.log(\\"dragEnd\\");
            // Restore source's border
            ev.target.style.border = \\"solid black\\";
            // Remove all of the drag data
            ev.dataTransfer.clearData();
          }
          </script>
          </head>
          <body>
          <h1>Drag and Drop: Copy and Move elements with <code>DataTransfer</code></h1>
           <div draggable=\\"true\\" id=\\"src_copy\\" ondragstart=\\"dragstart_handler(event);\\" ondragend=\\"dragend_handler(event);\\">
               Select this element and drag to the <strong>Copy Drop Zone</strong>.
           </div>
           <div id=\\"dest_copy\\" ondrop=\\"drop_handler(event);\\" ondragover=\\"dragover_handler(event);\\"><strong>Copy Drop Zone</strong></div>
           <div draggable=\\"true\\" id=\\"src_move\\" ondragstart=\\"dragstart_handler(event);\\" ondragend=\\"dragend_handler(event);\\" style=\\"border: dashed;\\">
               Select this element and drag to the <strong>Move Drop Zone</strong>.
           </div>
           <div id=\\"dest_move\\" ondrop=\\"drop_handler(event);\\" ondragover=\\"dragover_handler(event);\\"><strong>Move Drop Zone</strong></div>


          </body></html>",
          }
        `)
      })
    })
  })
})
