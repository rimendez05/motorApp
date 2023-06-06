require('dotenv').config();

const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('database aunthenticated...'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('database synced...'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}🛵`);
});
