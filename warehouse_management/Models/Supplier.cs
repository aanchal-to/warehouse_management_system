﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace warehouse_management.Models
{
    public class Supplier
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId id { get; set; }

        public string supplierId { get; set; }
        public string name { get; set; }
        public string contactPerson { get; set; }
        public string item { get; set; }
        public int quantity { get; set; }
        public bool status { get;set; }

    }
}
