import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Company ID is required'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, 'Industry is required'],
      trim: true,
    },
    size: {
      type: String,
      required: [true, 'Company size is required'],
      // ❗ Change ENUM if you use simple words like Small/Medium/USA etc.
      enum: ['0-50', '50-100', '100-250', '250-500', '500-1000', '1000+'],
    },
    founded: {
      type: Number,
      required: [true, 'Founded year is required'],
      min: [1900, 'Founded year must be after 1900'],
      max: [new Date().getFullYear(), 'Founded year cannot be in the future'],
    },
    website: {
      type: String,
      required: [true, 'Website is required'],
      trim: true,
      match: [
        /^https?:\/\/.+/,
        'Please provide a valid website URL starting with http:// or https://',
      ],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast search
companySchema.index({ name: 'text', description: 'text' });
companySchema.index({ location: 1 });
companySchema.index({ industry: 1 });
companySchema.index({ size: 1 });

// IMPORTANT: 3rd argument MUST BE STRING → your collection name
const Company = mongoose.model('Company', companySchema, 'comp');

export default Company;
