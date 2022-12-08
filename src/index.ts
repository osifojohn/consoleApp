import prompt from "prompt-sync";

let input = prompt();
let userInput = input("Enter keyword> ");

const commandInstructions = `Press "1" to save book by name, "2" to retrieve book by name, "quit" to quit`;

const handleUserInput = (userInput: string) => {
  const listOfBooks: { name: string; id: string }[] = [];

  const helper = (inputData: string) => {
    if (inputData === "quit") {
      return;
    }
    if (
      userInput !== "1" &&
      userInput !== "Enter keyword> " &&
      userInput !== "hints"
    ) {
      const inValidCommand = (userInput?: string) => {
        console.log(
          `Unkown command "${userInput}": type 'hints' to see lists of supported commands`
        );
      };
      inValidCommand(inputData);
      userInput = input("Please re-enter  keyword> ");
      helper(userInput);
    }

    if (userInput === "hints") {
      handleHints(userInput);
    }
    function handleHints(userInput: string) {
      console.log(commandInstructions);
      userInput = input("Please re-enter  keyword> ");
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
      if (userInput !== "2") {
        listOfBooks.push({ name: userInput, id: bookId });
        helper(userInput);
      }
    }
    if (userInput === "2") {
      retrieveBooksFromList();
    }
    function retrieveBooksFromList() {
      listOfBooks.length !== 0 && console.log(listOfBooks);
      userInput = input("Enter  command> ");
      helper(userInput);
    }
  };

  helper(userInput);
};
handleUserInput(userInput);
