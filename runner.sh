#!/bin/bash

# This makes the test run 50 times
for i in {1..10}
do
   echo "Run: $i"
   firebase emulators:exec --only "firestore,auth,storage" "npm run test" --project demo-project
done