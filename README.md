# illisible <img src="assets/logo.png" alt="logo" width="40" height="40" style="vertical-align:middle;margin-top:-12px">

A powerful and high-performance cross-runtime encryption software.

## Table of contents

- [Installation](#installation)
- [What's illisible](#whats-illisible)
- [Cipher vs Hash](#cipher-vs-hash)
- [API Documentation](#api-documentation)
    - [init](#init)
    - [generateKey](#generateKey)
    - [encrypt](#encrypt)
    - [decrypt](#decrypt)
    - [hash](#hash)
- [Author](#author)
- [Other packages](#other-packages)
- [Contact Me](#contact-me)
- [License](#license)

## Installation

```sh
# npm
$ npm install illisible

# yarn
$ yarn add illisible

# pnpm
$ pnpm add illisible

# bun
$ bun add illisible

# deno
$ deno add npm:illisible
```

## What's illisible

Illisible is a french word that means "unreadable", and in fact, its goal is to make your sensitive data secure and unreadable by unauthorized sources. To achive that purpose, it uses the powerful `AES-GCM` algorithm to **`cipher`** (encrypt), **`decipher`** (decrypt) and **`hash`** your data.

It's compatible with `Node.js`, `Deno`, `Bun` and `Web frontend frameworks` (React, Vue, Angular, etc.) and has been designed to be efficient, easy-to-use, with a very clear APIs.

## Cipher vs Hash

- **`cipher`**:

- **`Hash`**:

## API Documentation

> **Note: We're using top-level await in this documentation, so make sure that your environment is properly configured to support it as well.**

### **init**

First of all, we need to initialize illisible.

```ts
import illisible from 'illisible';

const illi = illisible.init({
    key: 'Vipi8IAWAYBlEWXCAlBWkk3TouVzpe63',
    defaultAlgo: '128'
});
```

- `init(*)`: It takes as argument a JSON object with the following properties :

  - **`key`**: (`string`) Your secret encryption key.

  - **`defaultAlgo?`**: (`128 | 256`) The algo that will be used by default for both encryption and decryption. It's optional and use the `128` algo by default.

### **generateKey**

```ts
const key = illi.generateKey();
console.log('key ::', key);
```

- `generateKey(?)`: It optionally takes as argument a JSON object with the following property :

  - **`algo`**: (`128 | 256`) Specify the algo for which you want to generate the key.

```sh
# log
key :: '3UkiYYyolTle5yepi3otaTAmr53B0UZW'
```

It returns the key as an `alphanumeric` string with a length of 32 for `128` and a length of 64 for `256`.

### **encrypt**

```ts
const data = 'Hello, world !';
const encrypt = await illi.encrypt({ data: data });
console.log('Encrypted data ::', encrypt);
```

- **`encrypt(*)`**: It takes as argument a JSON object with the following properties :

  - `data`: (`string`) The data you want to encrypt.

  - `algo?`: (`128 | 256`) Allow to specify if you want to encrypt the data with either `128` (default) or `256` algo.

```sh
# log
Encrypted data :: {
  ok: true,
  log: '',
  data: '500d17-bfaba-32309-4e61c-8ccf-79299d-a3a36-a875d-0d8fb-f3036-36c64-e9-6aed58-8b69f-ece8b-02c73-fe46c-cc7'
}
```

It returns as result a JSON object with the following properties :

- **`ok`**: (`boolean`) Indicates the status of the process: `true` for success and `false` for failure.

- **`log`**: (`string`) Contains the error message in case of failure.

- **`data`**: (`any | undefined`) Contains the expected result or undefined in case of failure.

> **Note: Except `generateKey()`, all other APIs will always return the same JSON format as result.**

### **decrypt**

```ts
/* Encrypted value of "Hello, world !" */
const encryptedData = '500d17-bfaba-32309-4e61c-8ccf-79299d-a3a36-a875d-0d8fb-f3036-36c64-e9-6aed58-8b69f-ece8b-02c73-fe46c-cc7';
const decrypt = await illi.decrypt({ data: encryptedData });
console.log('Decrypted data ::', decrypt.data);
```

- **`decrypt(*)`**: It takes as argument a JSON object with the following properties :

  - `data`: (`string`) The encrypted data you want to decrypt.

  - `algo?`: (`128 | 256`) Allow to specify the decryption algo, and note that **the decryption algo should always be the same as the encryption algo, if not the process will fail.**

```sh
# log
Decrypted data :: 'Hello, world !'
```

### **hash**

```ts
const password = 'my_password';
const hash = await illi.hash({ data: password });
console.log('Hashed data ::', hash.data);
```

- **`hash(*)`**: It takes as argument a JSON object with the following property :

  - `data`: (`string`) The data you want to hash.

```sh
# log
Hashed data :: 'f6e248ea994f3e342f61141b8b8e3ede86d4de53257abc8d06ae07a1da73fb39'
```

## Author

My name is **Hamet Kévin E. ODOUTAN** (@vinoskey524). I’ve been doing software development since 8 years now. I do web, desktop, and mobile development, and now I’m very excited to contribute to open-source with forestDB.

I’m not the kind of developer who types “How to build a cool web app” into Google and picks the first response, or the kind who makes a dumb copy-paste from ChatGPT. No !
I like to understand things and know what I’m really doing. For me, a real developer should be able to explain every single line of his code.

Don’t ask me which school or university I attended, because I taught myself software engineering using PDFs from **openclassrooms.com**, which was called **siteduzero** when I started.
A sad truth is that you can’t learn coding just by watching videos; you need books !

I’m really passionate about building software, and **I sincerely believe that being a developer is not just a job, but a lifestyle** !

## Other packages

Below are other packages from the same author.

- **[forestdb](https://npmjs.com/package/forestdb)**: An uncomplicated real-time database with encrypted HTTP and WebSocket server-client communication, fast caching, dataflow and state management, a cross-runtime file system manager, and more, working seamlessly on both frontend and backend.

- **[cococity](https://npmjs.com/package/cococity)**: A lightweight and high-performance library that provides regional data and precise GPS-based localization, without relying on external APIs.

<!-- - **[feedlist](https://npmjs.com/package/feedlist)**: . -->

<!-- - **[voicify](https://npmjs.com/package/voicify)**: A highly efficient and blazing fast Text-To-Speech (TTS) software. -->

## Contact Me

Feel free to reach me at [vinoskey524@gmail.com](mailto:vinoskey524@gmail.com). I speak both French and English.

## License

MIT License

Copyright (c) [2025] [Hamet Kévin E. ODOUTAN]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM,
OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.