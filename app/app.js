const { Client } = require('@elastic/elasticsearch');

// Tạo client kết nối đến Elasticsearch
const client = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'a123456'
    },
    tls: {
        ca: require('fs').readFileSync("./es-docker/certs/ca/ca.crt"),
        rejectUnauthorized: false
    }
});

// Hàm tạo index
async function createIndex() {
    const indexName = 'books';

    try {
        // Kiểm tra nếu index đã tồn tại
        const existsResponse = await client.indices.exists({ index: indexName });
        if (existsResponse) {
            console.log(`Index "${indexName}" đã tồn tại.`);
            return; // Ngừng hàm nếu index đã tồn tại
        }

        // Tạo index với mapping
        const response = await client.indices.create({
            index: indexName,
            body: {
                mappings: {
                    properties: {
                        title: { type: 'text' },
                        author: { type: 'keyword' },
                        published_date: { type: 'date' },
                        price: { type: 'float' },
                        tags: { type: 'keyword' }
                    }
                }
            }
        });
        console.log(`Index "${indexName}" đã được tạo thành công:`, response.body);
    } catch (error) {
        console.error('Lỗi khi tạo index:', error.message);
        if (error.body?.error?.root_cause) {
            console.error('Nguyên nhân gốc rễ:', error.body.error.root_cause);
        }
    }
}

// Hàm thêm dữ liệu vào index
async function addDocument() {
    const indexName = 'books';

    const document = {
        title: 'Elasticsearch Guide',
        author: 'Alice',
        published_date: '2023-05-01',
        price: 20.0,
        tags: ['guide', 'search']
    };

    try {
        const response = await client.index({
            index: indexName,
            id: '1', // ID cố định hoặc tự sinh
            body: document
        });
        console.log('Document đã được thêm thành công:', response);
    } catch (error) {
        console.error('Lỗi khi thêm document:', error.message);
    }
}

(async () => {
    await createIndex();
    await addDocument();
})();
