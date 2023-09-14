import 'dotenv/config'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import {typeDefs} from "./schema";

const driver = neo4j.driver(
    process.env.NEO4J_URI as string,
    neo4j.auth.basic(process.env.NEO4J_USER as string, process.env.NEO4J_PASSWORD as string)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

async function startServer() {
    const server = new ApolloServer({
        schema: await neoSchema.getSchema(),
    });

    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ req }),
        listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
}

startServer().catch(error => {
    console.error("Error starting the server:", error);
});
