
import { MySQLClient } from "../util/MySQLClient";
import supertest from "supertest";
import { app } from "../app";
import * as http from "http";
import { Pool } from "mysql2/typings/mysql/lib/Pool";

describe("Treasure Endpoints", () => {
    let server: http.Server
    let pool: Pool
    beforeAll(() => {
        server = app.listen(3000); // Start the server before running tests
    });
    
    afterAll((done) => {
        server.close(done); // Close the server after all tests are done
        pool.end()
    });

    it("should have connection to database", async () => {
        const mysqlClient = MySQLClient.getInstance()
        pool = mysqlClient.getConnectionPool();

        expect(pool).not.toBeNull()
    });

    it("should respond on health check", async () => {
        const response = await supertest(app).get("/api/v1/health")
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Up and running..."});
    })

    it("should produce a 404 error if attempted to find treasure box without coordinates", async () => {
        const response = await supertest(app).get("/api/v1/treasure")
        expect(response.status).toBe(404);
    })

    it("should produce a bad request error if attempted to find treasure box without the range", async () => {
        const response = await supertest(app).get("/api/v1/treasure/14.552036595352455,121.01696118771324")
        expect(response.status).toBe(400);
    })

    it("should produce a bad request error if attempted to find treasure box without with range that is not valid", async () => {
        const response = await supertest(app).get("/api/v1/treasure/14.552036595352455,121.01696118771324/2")
        expect(response.status).toBe(400);
    })

    it("should project the list of treasures ranging 1km on the current centerpoint[14.552036595352455,121.01696118771324]", async () => {
        const response = await supertest(app).get("/api/v1/treasure/14.552036595352455,121.01696118771324/1")
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("treasureBoxes");
        expect(response.body.treasureBoxes.length).toBeGreaterThan(0)
    })

    it("should project the list of treasures ranging 10km on the current centerpoint[14.552036595352455,121.01696118771324]", async () => {
        const response = await supertest(app).get("/api/v1/treasure/14.552036595352455,121.01696118771324/10")
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("treasureBoxes");
        expect(response.body.treasureBoxes.length).toBeGreaterThan(0)
    })

    it("should not project treasures ranging 1km on the current centerpoint[14.552036595352455,121.01696118771324]", async () => {
        const response = await supertest(app).get("/api/v1/treasure/14.552036595352455,121.01696118771324/1?page=2&limit=10")
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("treasureBoxes");
        expect(response.body.treasureBoxes.length).toBeLessThanOrEqual(0)
    })

    it("should produce a bad request error if attempted to find treasure box with invalid prize(40)", async () => {
        const response = await supertest(app).get("/api/v1/treasure/14.552036595352455,121.01696118771324/1?prize=40")
        expect(response.status).toBe(400);
    })

    it("should project treasures ranging 1km on the current centerpoint[14.552036595352455,121.01696118771324] and prize(20)", async () => {
        const response = await supertest(app).get("/api/v1/treasure/14.552036595352455,121.01696118771324/1?prize=20")
        expect(response.status).toBe(200);
        expect(response.body.treasureBoxes.length).toBeGreaterThan(0)
    })
    
})