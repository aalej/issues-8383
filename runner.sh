#!/bin/bash

# This makes the test run 5 times to see if any would randomly fail
for i in {1..5}
do
   echo "Run: $i"
   firebase emulators:exec --only "firestore,auth,storage" "npm run test" --project demo-project
done