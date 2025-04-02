const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} = require("@firebase/rules-unit-testing");
const fs = require("node:fs");

const MAX_COUNT = 1;

for (let i = 0; i < MAX_COUNT; i++) {
  describe(`Test number ${i}`, () => {
    beforeAll(async () => {
      await initializeTestEnvironment({
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

    it("Should add 1+1", () => {
      expect(1 + 1).toBe(2);
    });
  });
}
