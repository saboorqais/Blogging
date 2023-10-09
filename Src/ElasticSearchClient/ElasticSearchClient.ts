import { Client } from '@elastic/elasticsearch'
const elasticClient = new Client({
	node: "http://localhost:9200", // Replace with your Elasticsearch server's URL.
});

export default elasticClient;
