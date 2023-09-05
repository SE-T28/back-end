
const fetch=require("node-fetch");
const request=require("supertest");
const url="http://localhost:8080";

let tokenadmin;
let idadmin;
let tokentec;
let idtec;

describe("test-coverage delle tasks", ()=>{
    test("get lista task", async()=>{

        //accesso amministratore
        const amministratore=await request(url).post("/login").set("Content-type", "application/json").send({
            "nome":"Samantha",
            "cognome":"Cristoforetti",
            "password":"12345678"
        });
        tokenadmin=amministratore.body.accessToken;
        idadmin=amministratore.body.id;

        await request(url).get("/task")
        .set("Content-type", "application/json")
        .set("Authorization", tokenadmin)
        .expect(200)

        //accesso tecnico interno
        const tecnico_interno=await request(url).post("/login").set("Content-type", "application/json").send({
            "nome":"Jessica",
            "cognome":"Watkins",
            "password":"12345678"
        });
        tokentec=tecnico_interno.body.accessToken;
        idtec=tecnico_interno.body.id;

        const taskstec=await request(url).get("/task")
        .set("Content-type", "application/json")
        .set("Authorization", tokentec)
        .expect(200)

        for(let i=0; i<taskstec.body.length; i++){
            expect(taskstec.body[i]).toHaveProperty("userId", idtec);
        }
    })

    test("get lista task - accesso negato", async()=>{
        expect((await fetch(url + "/task")).status).toEqual(401);
    })

    test("get singola task", async()=>{

        let nome="Manutenzione Modulo"
        expect.assertions(3);

        //accesso amministratore
        expect((await fetch(url+"/task/" + nome, {headers: {"Authorization": tokenadmin}})).status).toEqual(200);

        //accesso tecnico interno
        let task=await request(url).get("/task/"+nome)
        .set("Content-type", "application/json")
        .set("Authorization", tokentec)

        expect(task.status).toEqual(200);
        expect(task.body).toHaveProperty("userId", idtec);
    })

    test("aggiunta task", async()=>{

        let payload;
        let task;

        //accesso amministratore
        payload={
            "nome":"nomeprova1",
            "data_inizio": "2023-09-11T00:00:00.000+00:00",
            "data_fine": "2023-09-16T00:00:00.000+00:00",
            "completata":false,
            "nomeuser": "Samantha",
            "cognomeuser": "Cristoforetti"
        }
        task= await request(url).post("/task")
        .set("Content-type", "application/json")
        .set("Authorization", tokenadmin)
        .send(payload)
        
        expect(task.status).toEqual(201);
        expect(task.body).toHaveProperty("userId", idadmin);

        //accesso tecnico interno
        payload={
            "nome":"nomeprova2",
            "data_inizio": "2023-09-11T00:00:00.000+00:00",
            "data_fine": "2023-09-16T00:00:00.000+00:00",
            "completata":false,
        }
        task= await request(url).post("/task")
        .set("Content-type", "application/json")
        .set("Authorization", tokentec)
        .send(payload)
        
        expect(task.status).toEqual(201);
        expect(task.body).toHaveProperty("userId", idtec);
    })

    test("aggiunta task - nome già presente nel db", async()=>{

        let payload={
            "nome":"Manutenzione Modulo",
            "data_inizio": "2023-09-11T00:00:00.000+00:00",
            "data_fine":"2023-09-16T00:00:00.000+00:00"
        };

        let response= await request(url).post("/task")
        .set("Content-type", "application/json")
        .set("Authorization", tokentec)
        .send(payload)

        expect(response.status).toEqual(409);
        expect(response.body.message).toEqual("Esiste già una task con questo nome");
    })

    test("aggiunta task - utente non esistente", async()=>{

        let payload={
            "nome":"test",
            "data_inizio": "2023-09-11T00:00:00.000+00:00",
            "data_fine":"2023-09-16T00:00:00.000+00:00",
            "nomeuser":"notexistingname",
            "cognomeuser":"notexistingname"
        }

        let response= await request(url).post("/task")
        .set("Content-type", "application/json")
        .set("Authorization", tokenadmin)
        .send(payload)

        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual("Utente non trovato");

    })

    test("modifica task", async()=>{

        let nome;
        let payload
        
        //accesso amministratore
        nome= "nomeprova1";
        payload={
            "nome": "nuovonome1",
            "data_inizio":"2023-07-22T23:01:12.102+00:00",
            "data_fine": "2023-07-30T23:01:12.102+00:00",
            "completata": true
        }
        
        await request(url).patch("/task/"+nome)
        .set("Content-type", "application/json")
        .set("Authorization", tokenadmin)
        .send(payload)
        .expect(200)

        //accesso tecnico_interno
        nome="nomeprova2";
        payload={
            "nome": "nuovonome2",
            "data_inizio":"2023-07-22T23:01:12.102+00:00",
            "data_fine": "2023-07-30T23:01:12.102+00:00",
            "completata": true
        }

        await request(url).patch("/task/"+nome)
        .set("Content-type", "application/json")
        .set("Authorization", tokentec)
        .send(payload)
        .expect(200)
    })


    test("eliminazione task", async()=>{

        let nome;

        //accesso amministratore
        nome="nuovonome1";

        await request(url).delete("/task/"+nome)
        .set("Content-type", "application/json")
        .set("Authorization", tokenadmin)
        .expect(200)

        //accesso tecnico interno
        nome="nuovonome2";

        let task= await request(url).delete("/task/"+nome)
        .set("Content-type", "application/json")
        .set("Authorization", tokentec)
        
        expect(task.status).toEqual(200);
        expect(task.body).toHaveProperty("userId", idtec);
    })

    test("eliminazione task - non esistente", async()=>{

        let nome="notexistingname";

        await request(url).delete("/task/"+nome)
        .set("Content-type", "application/json")
        .set("Authorization", tokenadmin)
        .expect(404)
    })
})