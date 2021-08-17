# Steem Smart Contracts for AVLE [![Build Status](https://travis-ci.org/harpagon210/steemsmartcontracts.svg?branch=master)](https://travis-ci.org/harpagon210/steemsmartcontracts)[![Coverage Status](https://coveralls.io/repos/github/harpagon210/steemsmartcontracts/badge.svg?branch=master)](https://coveralls.io/github/harpagon210/steemsmartcontracts?branch=master)

**NOTE**: master branch is for Steem Engine, for which further development has been discontinued. Only Hive Engine is currently under active development; please use the **hive-engine branch**.

 ## 1.  What is it?

Steem Smart Contracts is a sidechain powered by Steem, it allows you to perform actions on a decentralized database via the power of Smart Contracts.

 ## 2.  How does it work?

This is actually pretty easy, you basically need a Steem account and that's it. To interact with the Smart Contracts you simply post a message on the Steem blockchain (formatted in a specific way), the message will then be catched by the sidechain and processed.

 ## 3.  Sidechain specifications
- run on [node.js](https://nodejs.org)
- database layer powered by [MongoDB](https://www.mongodb.com/)
- Smart Contracts developed in Javascript
- Smart Contracts run in a sandboxed Javascript Virtual Machine called [VM2](https://github.com/patriksimek/vm2)
- a block on the sidechain is produced only if transactions are being parsed in a Steem block

## 4. Setup a Steem Smart Contracts node

see wiki: https://github.com/hive-engine/steemsmartcontracts-wiki/blob/master/How-to-setup-a-Steem-Smart-Contracts-node.md

## 5. Tests
* npm run test

## 6. Usage/docs

* see wiki: https://github.com/hive-engine/steemsmartcontracts-wiki
