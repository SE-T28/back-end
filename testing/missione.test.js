const fetch=require("node-fetch");
const url="http://localhost:8080";

describe("test-coverage delle missioni", ()=>{
    test("get lista missioni", async()=>{
        expect.assertions(1);
        expect((await fetch(url+"/missioni")).status).toEqual(200);
    })
})