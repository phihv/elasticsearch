# BẮT ĐẦU VỚI ELASTICSEARCH
# I. CÀI ĐẶT
```
cd es-docker
docker-compose up -d
```
Sau khi cài đặt, các service sẽ chạy với xác thực mặc định
- username: elastic
- password: a123456
- Elasticsearch: https://localhost:9200/
- Kibana: http://localhost:5601/

# II. Lý thuyết cơ bản với ES


### 1. Indices, documents và fields
Index là đơn vị lưu trữ cơ bản trong Elasticsearch - một logical namespace để lưu trữ dữ liệu có chung đặc điểm. \
Một index là tập hợp các document được xác định duy nhất bằng name hoặc alias. \
ES tuần tự hóa và lưu trữ dữ liệu dưới dạng JSON documents. Documents là một tập hợp của các field - là các cặp key-value chứa dữ liệu. Mỗi document có 1 ID duy nhất, bạn có thể tự tạo hoặc tự động tạo bởi ES.
Một document đơn giản trong ES có thể trông như thế này:
```json
{
  "_index": "my-first-elasticsearch-index",
  "_id": "DyFpo5EBxE8fzbb95DOa",
  "_version": 1,
  "_seq_no": 0,
  "_primary_term": 1,
  "found": true,
  "_source": {
    "email": "john@smith.com",
    "first_name": "John",
    "last_name": "Smith",
    "info": {
      "bio": "Eco-warrior and defender of the weak",
      "age": 25,
      "interests": [
        "dolphins",
        "whales"
      ]
    },
    "join_date": "2024/05/01"
  }
}
```
Một documents sẽ chứa data và metadata. Metadata fields là các trường hệ thống lưu trữ thông tin trong document. Trong ES, các metadata field có tiền tố là dấu gạch dưới. Ví dụ:
- _index: Tên của Index nơi document được lưu trữ.
- _id: ID của tài liệu. ID phải là duy nhất cho mỗi Index.

Mỗi index có một mapping hoặc schema về cách mà cách field trong document được lưu trữ. Mapping xác định kiểu dữ liệu cho mỗi field, cách mà các field được đánh index và nó nên được lưu trữ như thế nào. Khi thêm document vào ES, bạn có 2 cách để tùy chọn mapping:
- Dynamic mapping: Để Elasticsearch tự động phát hiện các loại dữ liệu và tạo ánh xạ cho bạn. Ánh xạ động giúp bạn bắt đầu nhanh chóng, nhưng có thể mang lại kết quả không tối ưu cho trường hợp sử dụng cụ thể của bạn do suy luận loại trường tự động.
- Explicit mapping: Xác định ánh xạ trước bằng cách chỉ định kiểu dữ liệu cho từng field. Được đề xuất cho production vì bạn có toàn quyền kiểm soát cách lập chỉ mục dữ liệu để phù hợp với trường hợp sử dụng cụ thể của mình.