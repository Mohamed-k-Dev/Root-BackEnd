// / what is node js ?
// + Node.js is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. It is a choice for building server-side applications and APIs.
// + Node.js uses an event-driven, single-threaded, asynchronous ,non-blocking I/O model, which makes it efficient and suitable for building scalable applications .

// * what is event driven model ?
// ? event driven model is a programming paradigm in which the flow of the program is determined by events, such as user actions, messages from other programs, or changes in the state of the system. 
// ? In an event-driven model, the program responds to events rather than executing a sequence of instructions in a predetermined order. This allows for more flexibility and responsiveness in applications, 
// ? as they can react to events as they occur rather than waiting for a specific point in the program to execute.

// * what is single threaded ?
// ? single-threaded means that a program or process can only execute one thread of execution at a time. In a single-threaded environment, all tasks are executed sequentially, 
// ? and the program cannot perform multiple operations simultaneously.

// * what is asynchronous ?
// ? asynchronous programming is a programming paradigm that allows for non-blocking operations, meaning that a program can continue to execute other tasks while waiting for an operation to complete.

// * what is non-blocking I/O ?
// ? non-blocking I/O means that a program can perform other operations while waiting for I/O operations to complete.

// - what make nodejs single threaded and non blocking ?
// _ Node.js uses an event loop to manage asynchronous operations. The event loop allows Node.js to handle multiple requests concurrently without blocking the main thread.

// / what is modules in nodejs ?
// + module is a reusable piece of code that can be imported and used in other parts of a Node.js application. Modules help to organize code and promote code reusability.

// - there are three types of modules in Node.js: built-in modules, local modules, and third-party modules.
// _ built-in modules: These are modules that come with Node.js and provide various functionalities, such as file system operations, HTTP server creation, and more. Examples include 'fs', 'http', 'path', etc.
// _ local modules: These are modules that you create yourself within your application. They can be organized into separate files and imported using the 'require' function.
// _ third-party modules: These are modules that are created by the community and can be installed using npm (Node Package Manager). They provide additional functionalities and can be easily integrated into your application. Examples include 'express', 'lodash', 'mongoose', etc.

// / path module ? 
// + The 'path' module in Node.js provides utilities for working with file and directory paths. It allows you to manipulate file paths in a way that is consistent across different operating systems.

// * __dirname and __filename in nodejs ?
// ? __dirname  It provides the absolute path to the directory where the current JavaScript file is located in.
// ? __filename It provides the absolute path to the current JavaScript file.

// * basename in nodejs ?
// ? it use to return the last portion of a path, which is typically the filename. It can be used to extract the filename from a full path. For example, if you have a path like '/path/to/file.txt', using basename will return 'file.txt'.

// * extname in nodejs ?
// ? it returns the file extension of a path. For example, if you have a path like '/path/to/file.txt', using extname will return '.txt'.

// * parse and format in nodejs ?
// ? parse It takes a file path as input and returns an object containing the various components of the path, such as root, dir, base, ext, and name.
// ? format It takes an object containing the various components of a file path and returns a string representation of the path.

// * isAbsolute in nodejs ?
// ? it is a method that checks if a given path is an absolute path. An absolute path is a path that starts from the root directory and specifies the complete location of a file or directory. The isAbsolute method returns true if the path is absolute, and false if it is not.

// * join and resolve in nodejs ? 
// ? join It is a method that joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path. For example, path.join('foo', 'bar', 'baz/asdf', 'quux', '..') will return 'foo/bar/baz/asdf'.
// ? resolve It is a method that resolves a sequence of paths or path segments into an absolute path. The given sequence of paths is processed from right to left, with each subsequent path prepended until an absolute path is constructed. For example, path.resolve('/foo/bar', './baz') will return '/foo/bar/baz'.

// - the difference between join and resolve ?
// _ join will return a relative path if the first argument is a relative path, while resolve will always return an absolute path. Additionally, resolve will consider the current working directory when resolving paths, while join will not.
// _ resolve will be equal to __dirname if no arguments are provided, while join will return an empty string in that case.   