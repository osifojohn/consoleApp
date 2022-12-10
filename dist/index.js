"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
let userInput = input("Enter keyword> ");
const commandInstructions = `Press "1" to save book by name, "2" to retrieve book by name, "quit" to quit`;
const handleUserInput = (userInput) => {
    const listOfBooks = [];
    const helper = (inputData) => {
        if (inputData === "quit") {
            return;
        }
        if (userInput === "hints") {
            handleHints(userInput);
        }
        function handleHints(userInput) {
            if (userInput === "quit") {
                return;
            }
            if (userInput === "1") {
                addBooksToList(userInput);
            }
            else if (userInput === "2") {
                retrieveBooksFromList();
            }
            else {
                console.log(commandInstructions);
                userInput = input("Please re-enter  keyword> ");
                helper(userInput);
            }
        }
        if (userInput !== "1" &&
            userInput !== "Enter keyword> " &&
            userInput !== "hints" &&
            userInput !== "2") {
            inValidCommand(userInput);
            userInput = input("Please re-enter  keyword> ");
            helper(userInput);
        }
        function inValidCommand(userInput) {
            console.log(`Unkown command "${userInput}": type 'hints' to see lists of supported commands`);
        }
        if (userInput === "1") {
            addBooksToList(userInput);
        }
        function addBooksToList(userInput) {
            const bookId = `${new Date().getMinutes()}${new Date().getSeconds()}`;
            userInput = input("Enter book name and press enter> ");
            if (userInput === "2") {
                retrieveBooksFromList();
            }
            if (typeof userInput === "string" && userInput.trim().length === 0) {
                console.log("Empty book name cannot be added to list");
                userInput = input("Enter book name and press enter> ");
                helper(userInput);
            }
            else {
                listOfBooks.push({ name: userInput, id: bookId });
                helper(userInput);
            }
        }
        if (userInput === "2") {
            retrieveBooksFromList();
        }
        function retrieveBooksFromList() {
            listOfBooks.length !== 0 && console.log(listOfBooks);
            listOfBooks.length === 0 &&
                console.log(`Your list is empty, please enter '1' to add books to list`);
            userInput = input("Enter  command> ");
            helper(userInput);
        }
    };
    helper(userInput);
};
handleUserInput(userInput);
