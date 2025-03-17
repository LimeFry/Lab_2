# Lab_2
This is a RESTful API using Node.js and Express.js.docx, it 
has a database in which it can store a basic item that contains
a string, access said items, change said items, and delete said items.

For example we can add an item called test 1 using the POST method contained
in the routes folder inside the items.js file, (POST method shown below)

router.post('/', async (req, res) => {
  try {
    await new Promise ((resolve) => setTimeout(resolve , 5000));
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

then the GET method can be used to retrieve said file,

router.get('/', async (req, res) => {
  try {
    await new Promise ((resolve) => setTimeout(resolve , 5000));
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

as well as with modifying it and deleting it with the other two methods.