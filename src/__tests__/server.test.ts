import { connectDB } from "../server"
import db from "../config/db"

jest.mock("../config/db")

describe("connectDB", () => {
    it("Should handle database connection error", async () => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("¡Hubo un error al conectarse a la base de datos!"))
        const consoleSpy = jest.spyOn(console, "log")

        await connectDB()

        expect(consoleSpy).toHaveBeenLastCalledWith(expect.stringContaining("¡Hubo un error al conectarse a la base de datos!"))
    })
})