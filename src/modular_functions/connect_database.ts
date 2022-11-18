import mongodb from 'mongodb'

export default async function connectDatabase() {

  const db_url = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_LINK}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
  const db_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  const mongo = mongodb.MongoClient;
  const client = await mongo.connect(db_url, db_options);
  return client ? client : false;

}
