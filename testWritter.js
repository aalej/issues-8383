// I don't like re-wrtting over and over again

const fs = require("node:fs");
const { join } = require("node:path");

const outPath = "__tests__"

const TEST_TEMPLATE = `const {
    assertSucceeds,
    initializeTestEnvironment,
} = require("@firebase/rules-unit-testing");
const { setDoc, doc, getDoc } = require("firebase/firestore");
const fs = require("node:fs");

for (let i = 0; i < {{MAX_COUNT}}; i++) {
    const testCount = i.toString().padStart(3, "0")
    describe(\`Test {{TEST_NUMBER}} - \${testCount}\`, () => {
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

}
`

const TEST_SCRIPT_MAX = 30; // Number of test script to be created
const TEST_RUNS_MAX = 100; // Times the test will be run


for (let i = 1; i <= TEST_SCRIPT_MAX; i++) {
    const testNumber = i.toString().padStart(3, "0")
    let testContent = TEST_TEMPLATE;
    testContent = testContent
        .replace("{{MAX_COUNT}}", TEST_RUNS_MAX)
        .replace("{{TEST_NUMBER}}", testNumber);

    fs.writeFileSync(join(outPath, `index_${testNumber}.spec.js`), testContent)
}
