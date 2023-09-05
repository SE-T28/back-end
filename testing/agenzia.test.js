const fetch=require("node-fetch");
const url="http://localhost:8080";

describe("test-coverage delle agenzie", ()=>{
    test("get lista agenzie", async()=>{
        expect.assertions(1);
        expect((await fetch(url+"/agenzie")).status).toEqual(200);
    })
})