var myArgs = process.argv.slice(2); 
var fs = require("fs");
const chalk = require("chalk");

const get_title = (text) => {
  if (text.startsWith("--title=")) {
    return text.substr(8, text.length);
  } else {
    console.log(chalk.red(" --title missing"));
    return null;
  }
};

const get_body = (text) => {
  if (text.startsWith("--body=")) {
    return text.substr(7, text.length);
  } else {
    console.log(chalk.red("--body missing"));
    return null;
  }
};

if (myArgs.length === 0) {
  console.log(chalk.red("No command to execute!"));
  return;
}

switch (myArgs[0]) {
  case "add":
    if (myArgs.length !== 3) {
      console.log(chalk.red("Pls provide both title and body"));
      return;
    }
    var title = get_title(myArgs[1]);
    var body = get_body(myArgs[2]);

    if (title !== null && body !== null) {
      var temp_obj = {
        title: title,
        body: body,
      };
      fs.readFile("notes.json", "utf8", function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          obj = JSON.parse(data);

          for (var i = 0; i < obj.length; i++) {
            if (title === obj[i].title) {
              console.log(chalk.red("Title already taken!"));
              return;
            }
          }
          obj.push(temp_obj);
          json = JSON.stringify(obj);
          fs.writeFile("notes.json", json, "utf8", function () {});
          console.log(chalk.black.bgBlue("Note Added"));
        }
      });
    }
    break;

  case "remove":
    if (myArgs.length !== 2) {
      console.log(chalk.red("Pls provide only the title"));
      return;
    }

    var title = get_title(myArgs[1]);

    if (title !== null) {
      fs.readFile("notes.json", "utf8", function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          obj = JSON.parse(data);

          for (var i = 0; i < obj.length; i++) {
            if (title === obj[i].title) {
              obj.splice(i, 1);
              json = JSON.stringify(obj);
              fs.writeFile("notes.json", json, "utf8", function () {});
              console.log(chalk.black.bgGreen("Note Removed"));
              return;
            }
          }
          console.log(chalk.red("Note not found!"));
        }
      });
    }

    break;

  case "list":
    if (myArgs.length !== 1) {
      console.log(chalk.red("Don't provide any title or body"));
      return;
    }

    fs.readFile("notes.json", "utf8", function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        console.log(chalk.black.bgCyan("Your Notes:"));
        for (var i = 0; i < obj.length; i++) {
          console.log(obj[i].title);
        }
      }
    });

    break;

  case "read":
    if (myArgs.length !== 2) {
      console.log(chalk.red("Pls provide only the title"));
      return;
    }

    var title = get_title(myArgs[1]);

    if (title !== null) {
      fs.readFile("notes.json", "utf8", function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          obj = JSON.parse(data);

          for (var i = 0; i < obj.length; i++) {
            if (title === obj[i].title) {
              console.log(chalk.black.bgYellowBright(obj[i].title));
              console.log(obj[i].body);
              return;
            }
          }
          console.log(chalk.red("Note not found!"));
        }
      });
    }
    break;

  default:
    console.log(chalk.red("No such command avaliable, List of available commands: add, remove, list, read"));
    break;
}
