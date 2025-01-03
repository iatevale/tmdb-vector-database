import {
    MilvusClient,
    QueryReq,
    SearchSimpleReq,
} from "@zilliz/milvus2-sdk-node";

const DIM = 384;
export const COLLECTION_NAME = "movies";
export const VECTOR_FIELD_NAME = "embedding"; // verctor field name
export const METRIC_TYPE = "COSINE";
export const INDEX_TYPE = "AUTOINDEX";

class Milvus {
    private _client: MilvusClient | undefined;
    constructor() {
        if (!this._client) {
            this.init(); // Initialize the Milvus client
        }
    }

    // Get the Milvus client
    public getClient() {
        return this._client;
    }

    // Initialize the Milvus client
    public async init() {
        // URI is required to connect to Milvus, TOKEN is optional
        if (!process.env.MILVUS_URL) {
            throw new Error("URI is required, please check your .env file.");
        }

        try {
            // Create a new Milvus client
            this._client = new MilvusClient({
                address: process.env.MILVUS_URL || "",
            });
        } catch (error) {
            throw error;
        }
    }

    // List all collections
    public async listCollections() {
        const res = await this._client?.listCollections();
        return res;
    }

    // Query data from a collection
    public async query(data: QueryReq) {
        return await this._client?.query(data);
    }

    // Search for data in a collection
    public async search(data: SearchSimpleReq) {
        return await this._client?.search({
            ...data,
        });
    }
}

// Create a singleton instance of the Milvus class
const milvus = new Milvus();

export { milvus };