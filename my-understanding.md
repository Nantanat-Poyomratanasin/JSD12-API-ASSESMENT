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

---

**4. What are HTTP status codes? List every status code you used in your API and explain why you chose it for that situation.**

_Your answer:_

---

**5. What is middleware? Describe what it does in your own words and give one example from your code.**

_Your answer:_
คือ function ที่มีหน้าที่เฉพาะเจาะจง เอามาวางต่อๆกันก่อนถึง controller เพื่อเพิ่มfeatureให้ Back end

---

**6. Why does the order of middleware matter in Express? What could go wrong if it were in the wrong order?**

_Your answer:_

---

**7. Walk through what happens on the server, step by step, when a POST request is sent to `/products`.**

_Your answer:_

---

**8. What is CRUD? Map each operation to the HTTP method and route you used in your API.**

_Your answer:_

---

**9. How does your API respond when something goes wrong — for example, when a product with a given ID does not exist?**

_Your answer:_

---

**10. What was the hardest part of building this API and what did you do to get past it?**

_Your answer:_
