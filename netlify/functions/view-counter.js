exports.handler = async (event, context) => {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.resolve('/tmp/viewcount.json'); // Temp storage in Lambda

  let count = 0;

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      count = JSON.parse(data).count || 0;
    }
  } catch (error) {
    console.error('Error reading file:', error);
  }

  count++;

  try {
    fs.writeFileSync(filePath, JSON.stringify({ count }));
  } catch (error) {
    console.error('Error writing file:', error);
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // For frontend calls
    },
    body: JSON.stringify({ count }),
  };
};
