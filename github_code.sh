#!/bin/bash

# User inputs
REPO_URL="https://github.com/pallavisaxena0245/Cococred.git"    # Replace with your repo URL
BRANCH_NAME="master"                               # Branch name to push to
ACCESS_TOKEN="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" # Replace with your personal access token

# Navigate to the local repository directory
# Replace with the path to your local Git repo

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "You have uncommitted changes. Committing changes..."

    # Stage all changes
    git add .

    # Commit the changes
    git commit -m "fixed Walletbutton  error"

    # Push the changes to the remote repository
    echo "Pushing changes to GitHub..."

    # Push code to the repository using the access token
    git push https://$ACCESS_TOKEN@github.com/pallavisaxena0245/Cococred.git $BRANCH_NAME

    echo "Changes pushed successfully!"
else
    echo "No changes to commit."
fi
