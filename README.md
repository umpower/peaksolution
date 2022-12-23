# Get Access To My Work Space And Check Out The School Management System.
    * https://peaksolutionschool.w3spaces.com

    
# Added dependencies:
    * express
    * ejs

# How to use this project ???
    * First install git in you pc.
    * Add all the files and folders in your git-repository.
    * Commit all the files
    * Add you email address which is linked to your github account
          // command
        * git config --global user.email "youEmailAddress@gmail.com"
    * Check that it is added or not ?
          // command
        * git config --global user.email
        * If it returns the email address you recently provided then go to next step.
    * Add you remote repository name in your git
          // command
        * git remote add origin https://github.com/username/repositoryname.git
    * Push your code from git to github repository
          // command
        * git push origin master
    * Install netlify cli in you project
          // command
        * npm install netlify-cli -g
    * Create a new function
          // command
        * netlify functions:create
    * Push to git to deploy
        * When done, you can invoke your function at /.netlify/functions/FUNCTION-NAME, relative to the base URL of your deployed site.
    