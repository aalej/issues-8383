const {
  assertSucceeds,
  initializeTestEnvironment,
} = require("@firebase/rules-unit-testing");
const { setDoc, doc, getDoc } = require("firebase/firestore");
const fs = require("node:fs");

describe(`Test 2`, () => {
  let testEnv = null;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "demo-project",
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
      },
      storage: {
        rules: fs.readFileSync("storage.rules", "utf8"),
        host: "localhost",
        port: 9199,
      },
      hub: {
        host: "localhost",
        port: 4400,
      },
    });
  });

  it("should allow writes to Firestore", async () => {
    const alice = testEnv.unauthenticatedContext();
    const docRef = doc(alice.firestore(), '/users/alice')
    await assertSucceeds(setDoc(docRef, {
      name: "alice",
      age: 26
    }));
  });

  it("should allow reads from Firestore", async () => {
    const alice = testEnv.unauthenticatedContext();
    const docRef = doc(alice.firestore(), '/users/alice')
    await assertSucceeds(getDoc(docRef));
  });
});
