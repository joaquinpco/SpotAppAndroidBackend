class Database
{
    client;

    database;
    container;

    databaseId;
    containerId;
    
    constructor(client, databaseId, containerId)
    {
        this.client = client;
        this.databaseId = databaseId;
        this.containerId = containerId;
    }

    async init()
    {
        const { database } = await this.client.databases.createIfNotExists({
            id: this.databaseId
        });

        this.database = database;

        const { container } = await this.client
            .database(this.databaseId)
            .containers.createIfNotExists(
                { id: this.containerId },
                { offerThroughput: 400 }
            );

        this.container = container;
    }

    async getAll()
    {
        const querySpec = {
            query: 'SELECT * FROM ' + this.containerId
        };

        const { resources: results } = await this.client
            .database(this.databaseId)
            .container(this.containerId)
            .items.query(querySpec)
            .fetchAll();
        
        return results;
    }

    async getByParameters(parameters = [])
    {
        if(parameters.length <= 0)
        {
            return await this.getAll();
        }

        const querySpec = {
            query: 'SELECT * FROM ' + this.containerId,
            parameters: parameters
        };
        
        const { resources: results } = await this.client
            .database(this.databaseId)
            .container(this.containerId)
            .items.query(querySpec)
            .fetchAll();
        
        return results;
    }

    async createItem(itemBody = {})
    {
        const { item } = await this.client
            .database(this.databaseId)
            .container(this.containerId)
            .items.upsert(itemBody);
        
         return item;
    }
};

module.exports = Database;