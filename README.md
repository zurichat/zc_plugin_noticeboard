- [CONTRIBUTION GUIDE](#contribution-guide)
- [RUNNING THE SERVER](#running-the-server)

## CONTRIBUTION GUIDE

1. Fork the repository and copy the remote url of your own repo.
2. On your terminal, clone repository using: `git clone <paste-the-remote-url-of-your-own-repo`
3. On your terminal, set the parent repo as your upstream using: `git remote add upstream https://github.com/zurichat/zc_plugin_noticeboard.git`
4. (a) Create a development branch as the is where the testing and all work will be taking place: `git checkout -b development.` 4 (b) If you already have a development branch: `git checkout development`.
5. Get the latest code from the parent repo and merge : `git pull upstream development`
6. You can start working on your task.

   Tip :bulb:: You can check the branch you are working on using `git branch`

7. Once you are done with coding, stage your changes: `git add .`
8. Then commit your changes your local branch: `git commit -m 'your reason for adding the code'`

   Tip :bulb:: You can check the files yet to be staged and committed with `git status`

9. Then check the parent repo if there has been any update since the last time you pull to avoid conflicts and have a work that is in sync by pulling from the parent repo again: `git pull upstream development`
10. Once it is done merging, push your changes to your own repo: `git push origin development`
11. Then go to your repo, click on make contributions (if create a pull request doesn't show up) and create a pull request.
12. Compare parent development branch with your own development branch and create a pull request

    :warning: And the rest will be history :slightly_smiling_face: as long as you dont have more than 20 file changes


## RUNNING THE SERVER

1. cd into `backend/notice_project/frontend`
2. run command `yarn start` to run in integrated mode<br/>
   OR
3. run command `yarn start:standalone` to run in standalone mode
4. open `localhost:8080` on your browser
