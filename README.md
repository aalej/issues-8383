# Repro for issue 8383

## Steps to reproduce

Currently not reproducible.

## File info

`runner.sh`

- Contains a script that runs `firebase emulators:exec --only "firestore,auth,storage" "npm run test" --project demo-project` x number of times

`__tests__/index_X.spec.ts`

- Contains a test that
  - Calls `initializeTestEnvironment`
  - Writes to Firestore
  - Reads from Firestore
