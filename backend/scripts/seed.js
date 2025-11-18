import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Company from '../models/Company.js'
import connectDB from '../config/db.js'

dotenv.config()

const companiesData = [
  {
    name: 'Northwind Analytics',
    location: 'New York, USA',
    industry: 'Analytics',
    size: '250-500',
    founded: 2014,
    website: 'https://northwind.io',
    description: 'Delivers AI-assisted analytics for finance and operations teams.',
  },
  {
    name: 'Evergreen Labs',
    location: 'Portland, USA',
    industry: 'Climate Tech',
    size: '50-100',
    founded: 2018,
    website: 'https://evergreenlabs.com',
    description: 'Builds SaaS for tracking carbon offsets and sustainability programs.',
  },
  {
    name: 'Helios Robotics',
    location: 'Munich, Germany',
    industry: 'Robotics',
    size: '500-1000',
    founded: 2010,
    website: 'https://heliosrobotics.de',
    description: 'Manufactures autonomous mobile robots for logistics centers.',
  },
  {
    name: 'Mariner Digital',
    location: 'Toronto, Canada',
    industry: 'Marketing Tech',
    size: '100-250',
    founded: 2016,
    website: 'https://marinerdigital.ca',
    description: 'Omnichannel marketing automation for mid-market retailers.',
  },
  {
    name: 'Aurora Bio',
    location: 'Boston, USA',
    industry: 'Biotech',
    size: '1000+',
    founded: 2007,
    website: 'https://aurorabio.com',
    description: 'R&D platform accelerating biologics discovery with cloud labs.',
  },
  {
    name: 'Skyline Mobility',
    location: 'Singapore',
    industry: 'Transportation',
    size: '250-500',
    founded: 2012,
    website: 'https://skylinemobility.sg',
    description: 'Fleet management software powering electric micro-transit fleets.',
  },
  {
    name: 'Atlas Pay',
    location: 'London, UK',
    industry: 'Fintech',
    size: '50-100',
    founded: 2019,
    website: 'https://atlaspay.co',
    description: 'Cross-border payments infrastructure for marketplaces.',
  },
  {
    name: 'BluePeak Security',
    location: 'Austin, USA',
    industry: 'Cybersecurity',
    size: '100-250',
    founded: 2015,
    website: 'https://bluepeaksec.com',
    description: 'Managed detection and response platform for critical infrastructure.',
  },
  {
    name: 'Coral Health',
    location: 'Sydney, Australia',
    industry: 'Health Tech',
    size: '250-500',
    founded: 2013,
    website: 'https://coralhealth.au',
    description: 'Remote patient monitoring and virtual care orchestration.',
  },
  {
    name: 'Lumen Studio',
    location: 'San Francisco, USA',
    industry: 'Design',
    size: '0-50',
    founded: 2021,
    website: 'https://lumen.studio',
    description: 'Boutique design studio crafting immersive brand experiences.',
  },
  {
    name: 'Swamy Studio',
    location: 'San Francisco, USA',
    industry: 'Design',
    size: '0-50',
    founded: 2021,
    website: 'https://swamystudio.com',
    description: 'Creative agency specializing in digital transformation and brand identity.',
  },
  {
    name: 'Quantum Computing Labs',
    location: 'Cambridge, UK',
    industry: 'Technology',
    size: '100-250',
    founded: 2017,
    website: 'https://quantumlabs.io',
    description: 'Pioneering quantum computing solutions for enterprise applications.',
  },
  {
    name: 'Green Energy Solutions',
    location: 'Berlin, Germany',
    industry: 'Climate Tech',
    size: '250-500',
    founded: 2015,
    website: 'https://greenenergy.de',
    description: 'Renewable energy management systems for smart cities.',
  },
  {
    name: 'DataViz Pro',
    location: 'Seattle, USA',
    industry: 'Analytics',
    size: '50-100',
    founded: 2019,
    website: 'https://datavizpro.com',
    description: 'Advanced data visualization tools for business intelligence.',
  },
  {
    name: 'CloudSync Technologies',
    location: 'Dublin, Ireland',
    industry: 'Technology',
    size: '500-1000',
    founded: 2011,
    website: 'https://cloudsync.io',
    description: 'Enterprise cloud synchronization and backup solutions.',
  },
]

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB()

    // Clear existing companies
    await Company.deleteMany({})
    console.log('🗑️  Cleared existing companies')

    // Insert seed data
    const companies = await Company.insertMany(companiesData)
    console.log(`✅ Seeded ${companies.length} companies successfully`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

