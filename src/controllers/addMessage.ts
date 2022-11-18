import connectToClient from '../modular_functions/connect_database'

export default async function addMessageToDatabase(request, response) {

  const originalMessage = request.body.message_content;
  const validatedMessage = isValidMessage(originalMessage);

  if (validatedMessage === false) {
    response.send('message was not validated, try to send all correct fields!');
  } else {
    const modifiedMessage = addMessageCustomFields(originalMessage);
    const databaseResponse = await sendToDatabase(modifiedMessage);
    console.log(`${modifiedMessage.message_id} -> ${databaseResponse}`);
    response.send(databaseResponse);
  }

};

function isValidMessage(originalMessage) {

  const { customer_name, customer_phone } = originalMessage;
  const { market_name, market_id } = originalMessage;
  const { message_type } = originalMessage;
  const { order_number, order_date, order_time, order_products } = originalMessage;

  if (!customer_name) { return false; }
  if (!customer_phone) { return false; }
  if (!market_name) { return false; }
  if (!market_id) { return false; }
  if (!message_type) { return false; }
  if (!order_number) { return false; }
  if (!order_date) { return false; }
  if (!order_time) { return false; }
  if (!order_products) { return false; }

  return true;
}

function addMessageCustomFields(originalMessage) {

  let message_type;

  if (originalMessage['message_type'] === 'greeting') {
    message_type = 'G';
  } else if (originalMessage['message_type'] === 'occurrences') {
    message_type = 'O';
  } else if (originalMessage['message_type'] === 'ready') {
    message_type = 'R';
  }

  const message_id = originalMessage['order_number'] + message_type;

  const messageToAdd = {
    ...originalMessage,
    message_id: message_id,
    message_status: 'pending'
  };

  return messageToAdd;
}

async function sendToDatabase(modifiedMessage) {

  const client = await connectToClient();

  if (!client) {
    console.log('fail to connect to database');
    return;
  }


  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection(process.env.COLLECTION_NAME);


  const alreadyAdded = await collection.find({ message_id: modifiedMessage.message_id }).toArray();


  let return_message;

  if (alreadyAdded.length === 0) {
    const addMessage = await collection.insertOne(modifiedMessage);
    return_message = addMessage ? 'added to database' : 'fail to add messages';
  } else {
    return_message = 'Message already added';
  }

  return return_message;
}

