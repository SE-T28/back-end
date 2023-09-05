const fetch=require("node-fetch");
const url="http://localhost:8080";

describe("test-coverage delle news", ()=>{
    test("get lista news", async()=>{
        expect.assertions(1);
        expect((await fetch(url+"/news")).status).toEqual(200);
    })
})