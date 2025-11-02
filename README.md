## 🧩 Overview
This Node.js + Express project parses Toronto Open Data’s **Library Branch Locations (KML)** file and displays library information dynamically in an EJS frontend.  

- The **home page** lists all library branches (`<Placemark>` elements).  
- Each branch name links to a **detail page** showing the branch’s name, address, phone number, and a **clickable link** to the library’s official page.  

---

## 🧠 Learning Objectives
- Read and parse **XML / KML** data using `fs` and `DOMParser`.  
- Render XML data with **EJS** templates.  
- Build **Express routes** (`/` and `/library/:id`).  
- Use the DOM method **`getElementById()`** (instead of XPath).  
- Extract and display structured data fields such as Address, Phone, and Link.  
