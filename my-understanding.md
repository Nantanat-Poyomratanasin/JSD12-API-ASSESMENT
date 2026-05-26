# My Understanding

## Submission Links

**Loom Video (must be set to public — anyone with the link):**
[paste your Loom video URL here]

---

## Questions

Answer each question in your own words. There are no trick questions.

The goal is not a perfect answer — it is an honest one. Write as if you are explaining to a friend who has never used Express. Completing this will prepare you for your video walkthrough.

Do not copy from documentation, your code comments, or AI output. If you are unsure about something, write what you do understand and note where the gap is.

---

**1. What does each HTTP method in your API mean — GET, POST, PUT or PATCH, and DELETE? Why do we use different methods instead of just using POST for everything?**

_Your answer:_
1.Get คือการขอเข้าถึงข้อมูลใน DB,Post คือการสร้างข้อมูลใหม่ใน DB, Patch คือการขออัพเดทข้อมูลโดย patch สามารถเปลี่ยนข้อมูลแค่บาง fieldได้ ส่วน delete คือการลบข้อมูล โดยทั้งหมดจะอิงจากเลข id ในการกำหนดข้อมูลที่จะจัดการ
2.ไม่สามารถใช้แค่ post อย่างเดียวได้เพราะแต่ละ mrthod มีหน้าที่ในการจัดการข้อมูลต่างกัน

---

**2. What is `express.json()` and what would happen if you left it out?**

_Your answer:_
คือ Middleware ที่ใช้แปลงข้อมูล json ให้เป็น Object JS เพื่อให้ App ของเราสามารถเข้าใจข้อมูลได้,ถ้าไม่ใช้ express.json() object req.body จะขึ้นว่า undefined เพราะ App อ่าน json ไม่ได้

---

**3. What is the difference between `req.body`, `req.params`, and `req.query`? Give a real example from your API for each one.**

_Your answer:_
1.req.body คือ object ที่เก็บข้อมูลที่ส่งมากับ request ที่เข้ามา สามารถ destructure เพื่อเอาของข้างในได้ เช่น const { name, price, quantity = 1 } = req.body
2.req.params คือ object ที่เก็บค่า route parameter หรือก็คือ id (ค่าที่เปลี่ยนได้ใน URL)
3.req.query คือ object ที่เก็บข้อมูล Query string (ข้อมูลท้าย URL หลังเครื่องหมาย ?)

---

**4. What are HTTP status codes? List every status code you used in your API and explain why you chose it for that situation.**

_Your answer:_
1.200 method ปกติที่ success
2.201 method POST ที่สร้างสำเร็จ
3.400 เมื่อ Client ส่งข้อมูลไม่ครบ
4.404 เมื่อ app หา product ไม่เจอ (request มาถูกต้องแต่ไม่มีข้อมูลนั้น)
5.500 เมื่อเจอ error อื่นๆที่ไม่ได้เกิดจาก client เช่น code bug/syntax error/database พัง --> server error

---

**5. What is middleware? Describe what it does in your own words and give one example from your code.**

_Your answer:_
คือ function ที่มีหน้าที่เฉพาะเจาะจง เอามาวางต่อๆกันก่อนถึง controller เพื่อเพิ่มfeatureให้ Back end
เช่น ในโค้ดนี้ middleware ที่ใช้คือการlog method กับ url ให้ดู
function logger(req, res, next) {
console.log(`${req.method} ${req.url}`);
//next() สั่งให้ไปต่อ ถ้าไม่มี Express จะหยุดอยุ่แค่นี้ เพราะมันคิดว่า middleware ยังทำงานไม่เสร็จ --> ค้าง/ไม่ได้ response
next();
}

---

**6. Why does the order of middleware matter in Express? What could go wrong if it were in the wrong order?**

_Your answer:_
ลำดับสำคัญเพราะ middleware ต้องอยู่ระหว่างการทำงานของฝั่ง request และ response โดยจะทำงานกับตัว request ที่เข้ามาก่อนถึง route และลำดับการวาง middleware แต่ละตัวก็สำคัญเพราะ middleware บางตัวอาจจะต้องพึ่งอันก่อนหน้าหรือถ้าวางสลับกันอาจจะให้ผลลัพท์ที่เราไม่ต้องการ

---

**7. Walk through what happens on the server, step by step, when a POST request is sent to `/products`.**

_Your answer:_
มันจะไปสร้าง product ตามที่ข้อมูล json ที่เราส่งไปโดยไปเก็บใน array ว่างเปล่า

---

**8. What is CRUD? Map each operation to the HTTP method and route you used in your API.**

_Your answer:_
CRUDคือการจัดการข้อมูลที่requestเข้ามาโดย C คือ POST,R คือ GET,U คือ PUT/PATCH,D คือ DELETE

---

**9. How does your API respond when something goes wrong — for example, when a product with a given ID does not exist?**

_Your answer:_
ขึ้นเลข 404 --> product not found

---

**10. What was the hardest part of building this API and what did you do to get past it?**

_Your answer:_
ทำความเข้าใจ logic ในบาง part เพราะพื้นฐาน JS ยังไม่แม่นมาก
