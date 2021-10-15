# Test-project-cypress
Project for testing with CI on github actions and publish report on github pages

## To get report
If you create PR or push your code in `main` branch will starting github actions for run cypress test and you can look the new report on [github pages](https://farvater-max.github.io/test-project-cypress/) in this repo

<details>
  <summary>How it works</summary>
  
  Project has [github workflow](https://github.com/Farvater-max/test-project-cypress/blob/main/.github/workflows/cypress-test.yaml) which triggered by `push` or `create pull request` in `main` branch. It flow runs remotely `Ubuntu` with node and install `npm dependensies` including `cypress`. After that flow will start script command `npm run test` and publish commit change on github pages and shaping the new test report. Also if you create `pull request` after tests run you'll get comment in pull request with message about success actions and link on the new test report  
  
  Command `npm run test` in turn launches `cypress run --browser Chrome` and starts a series commands namely `combine-reports`, `generate-report`, `copy-screenshots` which responce for formation and combine json report, generating from json report html report, and clumping to final report failed test screenshots. It work by using packages "mochawesome", "mochawesome-merge", and "mochawesome-report-generator" 

</details>

## local development
First of all pull this project and install npm dependencies
```
npm i
```
To run test launch command
```
npm run test
```
After end running tests html-report is located in folder  ```public/index.html```
If some check failed in report you can watch screnshot web-site in the moment of fail check  

To clean last run tests results before start a new iteration use command
```
npm run pretest
```





