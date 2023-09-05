const fetch=require("node-fetch");
const request=require("supertest");
const url="http://localhost:8080";

describe("test-coverage dei moduli", ()=>{
    test("get lista moduli", async()=>{
        expect.assertions(1);
        expect((await fetch(url+"/moduli")).status).toEqual(200);
    })

    test("get singolo modulo", async()=>{
        let nome="Unity";
        const response= await request(url).get("/moduli/"+nome);
        expect(response.statusCode).toEqual(200);
    })
})
