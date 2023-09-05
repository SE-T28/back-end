const fetch=require("node-fetch");
const request=require("supertest");
const url="http://localhost:8080";

let token;

describe("test-coverage degli utenti", ()=>{
    test("get crew", async ()=>{
        expect.assertions(1);
        expect((await fetch(url+"/crew")).status).toEqual(200);
    })

    test("login", async ()=>{
        let payload={
            "nome":"Samantha",
            "cognome":"Cristoforetti",
            "password":"12345678"
        }
        const res=await request(url).post("/login").set("Content-type", "application/json")
        .send(payload)
        .expect(200)

        token=res.body.accessToken;
    })

    test("login - credenziali errate", async() =>{

        let payload;
        let res;
        //user non esistente
        payload={
            "nome":"notexistingname",
            "cognome":"notexinstingname",
            "password":"notexistingpassword"
        }
        res=await request(url).post("/login").set("Content-type", "application/json")
        .send(payload)

        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual("User Not found.");

        //password errata
        payload={
            "nome":"Samantha",
            "cognome":"Cristoforetti",
            "password":"invalidpassword"
        }

        res=await request(url).post("/login").set("Content-type", "application/json")
        .send(payload)
        
        expect(res.status).toEqual(401);
        expect(res.body.message).toEqual("Invalid Password!");

    })

    test("aggiunta utente", async()=>{
        let payload={
            "nome":"nomeprova",
            "cognome":"cognomeprova",
            "password":"passwordprova"
        }

        await request(url).post("/crew/addusr")
        .set("Content-type","application/json")
        .set("Authorization", token)
        .send(payload)
        .expect(201)
    })

    test("aggiunta utente - utente già registrato", async()=>{
        let payload={
            "nome":"Samantha",
            "cognome":"Cristoforetti",
            "password":"12345678"
        }

        const response= await request(url).post("/crew/addusr")
        .set("Content-type", "application/json")
        .set("Authorization", token)
        .send(payload)

        expect(response.status).toEqual(409);
        expect(response.body.message).toEqual("Utente già presente");
    })

    test("Eliminazione user", async()=>{
        let nome="nomeprova";
        let cognome="cognomeprova";
        await request(url).delete("/crew/" + nome + "/" + cognome)
        .set("Content-type", "application/json")
        .set("Authorization", token)
        .expect(200);
    })

    test("Eliminazione user - user non esistente", async()=>{
        let nome="notexistingname";
        let cognome="notexistingname";
        const response= await request(url).delete("/crew/" + nome + "/" + cognome)
        .set("Content-type", "application/json")
        .set("Authorization", token)

        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("User '" + nome + " " + cognome + "' doesn't exist.");
    })
})