import { expect } from "chai";
import { Server } from "http";
import fetch from "node-fetch";
import { type } from "os";

let server: Server;
const TEST_PORT = "7777"

describe("Create/Update Comments", () => {

  let URL: string;

  before((done) => {
    // When we include a database, make sure that we use the test database

    //Switch to the test port for the API-server
    process.env["PORT"] = TEST_PORT;
    server = require("../src/app").server;
    URL = `http://localhost:${process.env.PORT}`;
    done()
  })

  after((done) => {
    server.close(done);
  })

  it("Should get the message Hello", async () => {
    const result = await fetch(`${URL}/api/dummy`).then(r => r.json());
    expect(result.msg).to.be.equal("Hello")
  })
})
