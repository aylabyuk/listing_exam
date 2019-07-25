import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import uniqud from 'uniqid';

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomIP = () => (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0);

const randomDevice = () => {
    let deviceArray = [
        "Samsung Galaxy S10 Plus",
        "iPhone XS Max",
        "Google Pixel 3",
        "Samsung Galaxy S10e",
        "OnePlus 7 Pro",
        "Huawei P30 Pro",
        "Samsung Galaxy Note 9",
        "iPhone XR"
    ]
    return deviceArray[Math.floor(Math.random() * deviceArray.length)];
}

const schemaString = `
    type Visit {
        id: ID
        datetime: String
        device: String
        ip: String
    }
    type Query {
        visits(filter: String): [Visit]
    }
`;

const schema = makeExecutableSchema({ typeDefs: schemaString });

addMockFunctionsToSchema(
    {
        schema,
        mocks: {
            Query: () => ({
                visits: () => new MockList(100)
            }),
            Visit: (parent, args, context, info) => {
                let filterDate = randomDate(new Date(2019, 0, 1), new Date());

                switch (args.filter) {
                    case "today":
                        filterDate = randomDate(new Date(), new Date());
                        break;
                    case "yesterday":
                        filterDate = randomDate(new Date(Date.now() - 86400000), new Date(Date.now() - 86400000));
                        break;
                    case "lastWeek":
                        filterDate = randomDate(new Date(Date.now() - 1209600000), new Date(Date.now() - 604800000));
                        break;
                    case "thisMonth":
                        const today = new Date()
                        filterDate = randomDate(new Date(today.getFullYear(), today.getMonth(), 0), new Date());
                        
                        break;
                    default:
                        break;
                }

                return {
                    id: uniqud(),
                    datetime: filterDate.toDateString(),
                    device: randomDevice(),
                    ip: randomIP()
                }
            }
        }
    }
);

export default schema;