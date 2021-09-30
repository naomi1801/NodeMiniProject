# NodeJsMiniProject

##Important
Run ``` npm i ``` to install all dependencies

## Avaliable Commands
Add note -> Requires user to enter Title and Body of the note and adds the note to our databse (json file)
Remove note -> Requires user to enter the Title of the note they want to remove and removes that note
List notes ->Lists the title of all the notes present
Read note -> Requires user to enter the title of the note they want to read and displays the body of that note on the terminal

## How to run

- For add: 
  - Run ` node app add --title="<Your Title>" --body="<Your Note Body>" `
- For remove: 
  - Run ` node app remove --title="<Note Titlte To Remove>" `
- For list: 
  - Run ` node app list `
- For read: 
  - Run ` node app read --title="<Read Note>" `
