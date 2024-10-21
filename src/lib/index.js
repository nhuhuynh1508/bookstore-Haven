const { MongoClient } = require("mongodb");
const dotenv = require("dotenv")
dotenv.config();

async function run() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    try {
        await client.connect();
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};