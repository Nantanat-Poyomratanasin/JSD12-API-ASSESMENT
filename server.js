import express from "express";

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());

//Custom middleware --> Request logger
//Request logger --> ดูว่ามี request อะไรเข้ามาที่ server บ้าง
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  //next() สั่งให้ไปต่อ ถ้าไม่มี Express  จะหยุดอยุ่แค่นี้ เพราะมันคิดว่า middleware ยังทำงานไม่เสร็จ --> ค้าง/ไม่ได้ response
  next();
}

app.use(logger);

const products = []; //in memory array(สร้าง DB ชั่วคราว)

//Query string --> filter name
// if url = /products?name=mouse  --> Path คือ /products, Query string คือ ?name=mouse แล้ว express จะเก็บไว้ใน req.query
app.get("/products", (req, res, next) => {
  try {
    const { name } = req.query;

    if (name) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase()),
      );

      //ถ้า filter แล้วไม่เจอ product ที่ตรงเลย จะได้ [] --> ต้องมี logic เช็คว่าถ้า [] --> คือ error
      if (filteredProducts.length === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      return res.json(filteredProducts);
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
});

//ดึงสินค้าตาม id
//id-->Router parameter=ค่าที่เปลี่ยนได้ในurl
//ถ้า url คือ /products/123 --> id =123 และ express จะเก็บค่า id ไว้ใน req.params --> req.params.id = 123
app.get("/products/:id", (req, res, next) => {
  // products.find() หา"ตัวแรก"ที่ตรงกับเงื่อนไขแล้วหยุดทันที แล้วคืน object นี้กลับมา
  //ถ้า find() หาไม่เจอเลยจะได้ undefined แต่ filter ถ้าหา "ทุกตัว" แล้วไม่เจอจะได้ [] ซึ่งไม้ใช่ error
  try {
    const product = products.find((product) => product.id === req.params.id);

    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;

      throw error; //ถ้าเกิด error JS หยุดทำงานทันที
    }

    res.json(product);
  } catch (error) {
    //catch จับ error
    next(error); //ส่ง error เข้า error handling middleware --> หยุด middleware/route ที่เหลือทั้งหมดแล้วไปที่ error middleware เลย
  }
});

//add product
app.post("/products", (req, res, next) => {
  try {
    const { name, price, quantity = 1 } = req.body; //Destructure  เพื่อดึงค่าจาก body

    if (!name || !price) {
      const error = new Error("Name and price are required");

      error.status = 400;

      throw error;
    }

    const newProduct = {
      id: String(Date.now()),
      name,
      price,
      quantity,
    };

    products.push(newProduct);

    res.status(201).json(newProduct); //201 create successfully
  } catch (error) {
    next(error);
  }
});

//PUT = replace ทั้ง object
//PATCH = update บาง field
app.patch("/products/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    const product = products.find((product) => product.id === id);

    if (!product) {
      const error = new Error("Product not found");

      error.status = 404;

      throw error;
    }

    const { name, price, quantity } = req.body;

    //เขียนแบบนี้เพื่อรองรับ falsy values เช่น 0
    if (name !== undefined) {
      product.name = name;
    }

    if (price !== undefined) {
      product.price = price;
    }

    if (quantity !== undefined) {
      product.quantity = quantity;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

app.delete("/products/:id", (req, res, next) => {
  try {
    //หาเลข index ของ id นั้น
    const index = products.findIndex((product) => product.id === req.params.id);

    if (index === -1) {
      const error = new Error("Product not found");

      error.status = 404;

      throw error;
    }

    //ใช้ .splice() เพื่อลบข้อมูลออกจาก array
    //array.splice(เลข index, จน.ตัวที่ลบ)
    products.splice(index, 1);

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    next(error);
  }
});

//error handlering Middleware --> รับ parameter 4 ตัว, ทำงานเฉพาะตอนมี error,ไว้ดักunexpected errorsทั้งหมด
//จัดการ error ทั้งหมดของระบบ
//ไว้ท้ายสุดเพราะต้องรอ error จากทุก route
app.use((err, req, res, next) => {
  console.error(err.message);

  //500-->server error(ไม่ใช่ user fault) --> Cannot read properties of undefined
  //หมายถึง-->ถ้ามี error หลุดมาถึงนี่ ให้ถือว่า server พัง
  res.status(500).json({
    success: false,
    message: err.message,
  });
});
