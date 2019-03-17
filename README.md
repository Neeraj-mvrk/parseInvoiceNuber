# parseInvoiceNuber
When is it a good idea to not use NodeJs? Why?

• Using Node.js is merely a bad Idea for CRUD based heavy application.

• It has an Asynchronous model which makes it difficult for beginners to understand.

• It doesn't have any advantage of multiple processors because of single thread application.

• For the event, loop-blocking use case Node will never be a great choice.

• Sometimes it lacked in terms of quality NPM packages.

• Node.js is not a good choice to support application on intensive computation.

• Its process is too slow because of CPU intensiveness.

• Node.js a relational database-Backed Server-Side Applications.

• Node.js hasn't been built with the solving the compute scaling issue in mind.

Two of the most argued about aspects of Node.js programming are its insufficiency with heavy computations and the so-called “callback hell”. Before we get into too many details, let’s figure out what’s what.

As we know, JavaScript (and, as a result, Node.js) is asynchronous by nature and has a non-blocking I/O (input/output) model. This means, it can process several simple tasks (for example, read/write database queries) queued in the background without blocking the main thread and do so quickly.

At the same time, Node.js is a single-threaded environment, which is often considered a serious drawback of the technology. Indeed, in some cases, a CPU-bound task (number crunching, various calculations) can block the event loop resulting in seconds of delay for all Node.js website users.

This represents a serious issue. That is why, to avoid it, it is recommended not to use Node.js with computation-heavy systems.

Due to its asynchronous nature, Node.js relies heavily on callbacks, the functions that run after each task in the queue is finished. Keeping a number of queued tasks in the background, each with its callback, might result in the so-called callback hell, which directly impacts the quality of code. Simply put, it’s a “situation where callbacks are nested within other callbacks several levels deep, potentially making it difficult to understand and maintain the code.”
