const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});
router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();
  if (!category) {
    return res.status(404).send("the category can not be created");
  }
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(500).json({
      message: "the category with the given ID was not Found",
    });
  } else {
    res.send(category);
  }
});

router.delete("/:id", async (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "the category was removed Successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Category was not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.icon,
    },
    {
      new: true,
    }
  );
  if (!category) {
    res.status(400).send("the category cannot be created");
  }
  res.send(category);
});

module.exports = router;
