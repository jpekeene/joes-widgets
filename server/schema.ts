export const typeDefs = `#graphql
    type Manufacturer {
        id: ID! @id
        name: String
        widgets: [Widget!]! @relationship(type: "CREATED_BY", direction: IN)
    }
    
    type Widget {
        id: ID! @id
        name: String
        stockLevel: Int
        manufacturer: Manufacturer! @relationship(type: "CREATED_BY", direction: OUT)
        type: WidgetType! @relationship(type: "IS_TYPE", direction: OUT)
    }
    
    type WidgetType {
        id: ID! @id
        name: String
        widgets: [Widget!]! @relationship(type: "IS_TYPE", direction: IN)
    }
`;
