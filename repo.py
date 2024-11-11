import requests
import csv
from requests.auth import HTTPBasicAuth

# Replace 'your_github_token' with your actual GitHub PAT
GITHUB_TOKEN = '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'
ORGANIZATION = 'razorpay'

def get_org_repos(org):
    url = f'https://api.github.com/orgs/{org}/repos'
    repos = []
    page = 1

    while True:
        response = requests.get(
            url,
            params={'page': page, 'per_page': 100, 'type': 'all'},  # Fetch all repos, including private
            auth=HTTPBasicAuth('pallavisaxena-0245', GITHUB_TOKEN)
        )
        response.raise_for_status()  # Check for errors

        data = response.json()
        if not data:
            break
        repos.extend(data)
        page += 1

    return repos

def get_repo_languages(org, repo_name):
    url = f'https://api.github.com/repos/{org}/{repo_name}/languages'
    response = requests.get(url, auth=HTTPBasicAuth('pallavisaxena-0245', GITHUB_TOKEN))
    response.raise_for_status()
    return response.json()

def main():
    repos = get_org_repos(ORGANIZATION)
    
    # Create and write to CSV
    with open('repos_languages.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Repository Name', 'Private', 'Languages Used'])

        for repo in repos:
            repo_name = repo['name']
            is_private = repo['private']  # Check if the repo is private
            languages = get_repo_languages(ORGANIZATION, repo_name)
            languages_list = ', '.join(languages.keys()) if languages else "No languages data"
            writer.writerow([repo_name, is_private, languages_list])

    print("Data saved to repos_languages.csv")

if __name__ == '__main__':
    main()
