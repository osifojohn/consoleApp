import prompt from "prompt-sync";

let input = prompt();
let userInput = input("Enter keyword> ");

const commandInstructions = `Press "1" to save book by name, "2" to retrieve book by name, "quit" to quit`;

const handleUserInput = (userInput: string) => {
  const listOfBooks: { name: string; id: string }[] = [];

  const helper = (inputData: string) => {
    if (userInput === "quit") {
      return;
    }

    if (userInput === "hints") {
      console.log(commandInstructions);
      userInput = input("Please re-enter  keyword> ");
      helper(userInput);
    }

    if (
      inputData !== "1" &&
      inputData !== "Enter keyword> " &&
      inputData !== "hints" &&
      inputData !== "2"
    ) {
      if (userInput !== "1") {
        console.log(
          `Unkown command "${userInput}": type 'hints' to see lists of supported commands`
        );
        userInput = input("Please re-enter  keyword> ");
        helper(userInput);
      }
      helper(userInput);
    }

    if (userInput === "1") {
      addBooksToList(userInput);
    }
    function addBooksToList(userInput: string) {
      const bookId = `${new Date().getMinutes()}${new Date().getSeconds()}`;
      userInput = input("Enter book name and press enter> ");
      if (userInput === "2") {
        retrieveBooksFromList();
      }
      if (typeof userInput === "string" && userInput.trim().length === 0) {
        console.log("Empty book name cannot be added to list");
        userInput = input("Enter book name and press enter> ");
        helper(userInput);
      } else {
        listOfBooks.push({ name: userInput, id: bookId });
        helper(userInput);
      }
    }

    if (userInput === "2") {
      retrieveBooksFromList();
    }
    function retrieveBooksFromList() {
      if (listOfBooks.length !== 0) {
        const books = listOfBooks.map(function (item) {
          return item["name"];
        });
        console.log(...books);
      }
      listOfBooks.length === 0 &&
        console.log(
          `Your list is empty, please enter '1' to add books to list`
        );
      userInput = input("Enter  command> ");
      helper(userInput);
    }
    helper(userInput);
  };

  helper(userInput);
};
handleUserInput(userInput);
