
const express = require("express");
const fs = require("fs");
const { DOMParser } = require("@xmldom/xmldom");

const router = express.Router();

// XML
async function loadXML() {
  const data = await fs.promises.readFile("./public/library-data.kml", "utf8");
  const clean = data.replace(/^\uFEFF/, "");
  const parser = new DOMParser();
  return parser.parseFromString(clean, "text/xml");
}

//all branches
async function getAllBranches() {
  const doc = await loadXML();
  const placemarks = doc.getElementsByTagName("Placemark");
  const branches = [];

  for (let i = 0; i < placemarks.length; i++) {
    const p = placemarks[i];
    const id = p.getAttribute("id");
    const name = p.getElementsByTagName("name")[0]?.textContent || "No name";
    const description =
      p.getElementsByTagName("description")[0]?.textContent || "";
    branches.push({ id, name, description });
  }

  return branches;
}

// branch by id
async function getBranchById(id) {
  const doc = await loadXML();
  const node = doc.getElementById(id);
  if (!node) return null;

  const name = node.getElementsByTagName("name")[0]?.textContent || "N/A";
  const desc = node.getElementsByTagName("description")[0]?.textContent || "";

  // extract address, phone, and link
 const addrMatch = desc.match(/Address:(.*?)<br/i);
const phoneMatch = desc.match(/Phone:(.*?)<br/i);
const linkMatch = desc.match(/Link:\s*(https?:\/\/[^\s<]+)/i);

const address = addrMatch ? addrMatch[1].trim() : "N/A";
const phone = phoneMatch ? phoneMatch[1].trim() : "N/A";
const link = linkMatch ? linkMatch[1].trim() : null;

return { id, name, address, phone, link };

}

// Routes
router.get("/", async (req, res) => {
  try {
    const branches = await getAllBranches();
    res.render("index", { title: "Libraries", branches });
  } catch (err) {
    res.status(500).send("Error loading library data: " + err.message);
  }
});

router.get("/library/:id", async (req, res) => {
  try {
    const branch = await getBranchById(req.params.id);
    if (!branch) return res.status(404).send("Library not found");
    res.render("library", { branch });
  } catch (err) {
    res.status(500).send("Error reading library: " + err.message);
  }
});

module.exports = router;
