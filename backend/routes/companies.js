import express from 'express'
import Company from '../models/Company.js'

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const { search, id, name, location, industry, size } = req.query;

    let filter = {};

    // ⭐ ID FILTER (highest priority)
    if (id && id.trim()) {
      filter.id = id.trim();

      const company = await Company.find(filter);
      return res.json({
        success: true,
        count: company.length,
        data: company
      });
    }

    // ⭐ NAME FILTER (exact match)
    if (name && name.trim()) {
      filter.name = { $regex: `^${name.trim()}$`, $options: "i" };
    }

    // ⭐ SEARCH FILTER (partial)
    if (search && search.trim()) {
      const s = search.trim();
      filter.$or = [
        { name: { $regex: s, $options: "i" } },
        { description: { $regex: s, $options: "i" } },
      ];
    }

    // ⭐ LOCATION FILTER
    if (location && location !== "all") {
      filter.location = location.trim();
    }

    // ⭐ INDUSTRY FILTER
    if (industry && industry !== "all") {
      filter.industry = industry.trim();
    }

    // ⭐ SIZE FILTER
    if (size && size !== "all") {
      filter.size = size.trim();
    }

    // ⭐ FETCH DATA
    const companies = await Company.find(filter).sort({ name: 1 });

    res.json({
      success: true,
      count: companies.length,
      data: companies
    });

  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});



export default router
