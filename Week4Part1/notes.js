// / stream in nodejs ?
// + stream is a sequence of data that is being transferred from one place to another. it use to handle large amount of data that can not be stored in memory at once.
// + it transfer data in chunks, which can be processed as they are received and stored in buffer. this is useful for handling large files, such as video or audio files, or for handling data that is being generated in real-time, such as sensor data or user input.

// * buffer in nodejs ?
// ? buffer is a variable-length array of bytes that is used to store data in memory.

// * chunk in nodejs ?
// ? chunk consist of data that is being transferred from one place to another.

// / create a read stream and write stream in nodejs ?
// + read stream is used to read data from a file or other source, while write stream is used to write data to a file or other destination.

// * create a read stream in nodejs ?
// ? use fs.createReadStream() method to create a read stream. it takes the file path and options as arguments (encoding, highWaterMark , autoClose , emitClose ,start , end).
// ? readStream.on("open" , () => {}) method is used to listen for the "open" event, which is emitted when the stream is opened. it takes a callback function as an argument, which is called when the "open" event is emitted.
// ? readStream.on("ready" , () => {}) method is used to listen for the "ready" event, which is emitted when the stream is ready to be read. it takes a callback function as an argument, which is called when the "ready" event is emitted.
// ? readStream.on("data" , (chunk) => {}) method is used to read data from the read stream. it takes a callback function as an argument, which is called every time a chunk of data is read from the stream.
// ? readStream.on("pause" , () => {}) method is used to listen for the "pause" event, which is emitted when the stream is paused. it takes a callback function as an argument, which is called when the "pause" event is emitted.
// ? readStream.on("resume" , () => {}) method is used to listen for the "resume" event, which is emitted when the stream is resumed. it takes a callback function as an argument, which is called when the "resume" event is emitted.
// ? readStream.on("end" , () => {}) method is used to listen for the "end" event, which is emitted when the stream has finished reading all the data. it takes a callback function as an argument, which is called when the "end" event is emitted.
// ? readStream.on("close" , () => {}) method is used to listen for the "close" event, which is emitted when the stream is closed. it takes a callback function as an argument, which is called when the "close" event is emitted.
// ? readStream.on("error" , (err) => {}) method is used to listen for errors that occur while reading data from the stream. it takes a callback function as an argument, which is called when an error occurs.

// _ readStream.pause() method is used to pause the stream, which will stop the "data" event from being emitted until the stream is resumed.
// _ readStream.resume() method is used to resume the stream, which will allow the "data" event to be emitted again.
// _ readStream.destroy() method is used to destroy the stream, which will emit the "close" event and stop all events from being emitted.

// * create a write stream in nodejs ?
// ? use fs.createWriteStream() method to create a write stream. it takes the file path and options as arguments (encoding)
// ? write stream is used to write data to a file or other destination. it can be used to write data in chunks, which can be processed as they are received and stored in buffer. this is useful for handling large files, such as video or audio files,
// ? or for handling data that is being generated in real-time, such as sensor data or user input.
// ? writeStream.write(chunk) method is used to write data to the write stream. it takes the data to be written as an argument.

// * autoClose and emitClose in nodejs ?
// ? autoClose is a boolean option that determines whether the stream should automatically close when it reaches the end of the file. if set to true, the stream will automatically close when it reaches the end of the file. if set to false, the stream will remain open until it is manually closed.
// ? emitClose is a boolean option that determines whether the stream should emit a "close" event when it is closed. if set to true, the stream will emit a "close" event when it is closed. if set to false, the stream will not emit a "close" event when it is closed.

// * highWaterMark in nodejs ?
// ? highWaterMark is a number that determines the maximum number of bytes that can be stored in the internal buffer before the stream emits a "data" event.

// / pipe in nodejs ?
// + pipe is a method that is used to connect a readable stream to a writable stream. it allows data to be transferred from the readable stream to the writable stream without the need for manual handling of the data.
// + it takes the writable stream as an argument and returns the writable stream, which can be used for chaining multiple pipes together.

// * create a gzip stream in nodejs ?
// ? use createGzip() method from the zlib module to create a gzip stream. it takes no arguments and returns a gzip stream that can be used to compress data using the gzip algorithm.
// ? readFileStream.pipe(gzip).pipe(writeStreamFileZip) method is used to pipe the gzip stream to the write stream, which will allow the compressed data to be written to the file. 
// ? it takes the write stream as an argument and returns the write stream, which can be used for chaining multiple pipes together.
// ? the destination file will be created with the .gz extension, which indicates that it is a gzip compressed file. the original file can be decompressed using a tool that supports gzip, such as gunzip or zlib.