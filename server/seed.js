const mongoose = require('mongoose');

// Define Project Schema locally to avoid relative import issues during standalone execution
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    dateCompleted: {
      type: Date,
      required: [true, 'Completion date is required']
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required']
    },
    aspectRatio: {
      type: String,
      default: 'landscape'
    },
    featured: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    }
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

// Define Inquiry Schema locally as well for safety
const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required']
    },
    estimatedDate: {
      type: Date,
      required: [true, 'Estimated date is required']
    },
    budgetRange: {
      type: String,
      required: [true, 'Budget range is required']
    },
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    status: {
      type: String,
      default: 'new'
    }
  },
  { timestamps: true }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

const seedProjects = [
  {
    title: "The West Texas Residency",
    category: "editorial",
    location: "Marfa, Texas",
    dateCompleted: new Date("2024-10-15"),
    imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "landscape",
    featured: true,
    description: "A cinematic visual study of raw editorial fashion set against the stark, minimalist horizons and industrial art installations of high-desert Marfa. Captured exclusively during the golden autumn dusk using harsh directional natural light."
  },
  {
    title: "Limestone & Oak Sanctuary",
    category: "architectural",
    location: "Austin, Texas",
    dateCompleted: new Date("2024-09-02"),
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "landscape",
    featured: true,
    description: "A comprehensive structural essay documenting a modern architectural residence in West Lake Hills. Focused on the interplay between native Texas limestone facades, rich white oak interiors, and sweeping midday shadows."
  },
  {
    title: "Bespoke Bridal at the Quarry",
    category: "portrait",
    location: "San Antonio, Texas",
    dateCompleted: new Date("2024-11-05"),
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "portrait",
    featured: true,
    description: "An emotional, editorial-grade bridal portrait sequence capturing intimate moments and fluid movement against the sheer white face of an abandoned limestone quarry. Emphasizes soft Texan backlighting."
  },
  {
    title: "The Brutalist Retreat",
    category: "architectural",
    location: "Dallas, Texas",
    dateCompleted: new Date("2024-08-20"),
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "landscape",
    featured: false,
    description: "An architectural exploration of a private residence that merges monumental raw concrete slabs with organic, warm indoor gardens. Showcases geometric symmetry and high-contrast shadow play."
  },
  {
    title: "Sartorial Monologues",
    category: "portrait",
    location: "Austin, Texas",
    dateCompleted: new Date("2024-11-12"),
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "portrait",
    featured: true,
    description: "A striking series of black-and-white executive studio portraits capturing Texas-based visionaries and designers. Built around clean backgrounds, heavy chiaroscuro illumination, and deliberate, quiet poses."
  },
  {
    title: "Wild Ochre Campaign",
    category: "editorial",
    location: "Big Bend National Park, Texas",
    dateCompleted: new Date("2024-07-28"),
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200",
    aspectRatio: "landscape",
    featured: false,
    description: "High-fashion editorial capsule collection campaign styled in earthy, ochre tones. Photographed amidst the rugged canyons and sun-scorched clay structures along the Rio Grande borderlands."
  }
];

const seedInquiries = [
  {
    fullName: "Eleanor Sterling",
    email: "eleanor@sterlingandco.design",
    phone: "512-555-0198",
    projectType: "architectural",
    estimatedDate: new Date("2025-04-10"),
    budgetRange: "$5,000 - $10,000",
    message: "We are completing our latest residential build in Austin's Barton Hills neighborhood. The home highlights expansive glass walls and natural stucco textures, and we need Lumière's mastery of natural light to capture it for publication.",
    status: "new"
  },
  {
    fullName: "Marcus Vance",
    email: "marcus.vance@vancemedia.com",
    phone: "214-555-3342",
    projectType: "editorial",
    estimatedDate: new Date("2025-05-18"),
    budgetRange: "$10,000+",
    message: "Looking to commission a cinematic outdoor apparel campaign. We want to shoot in the Hill Country utilizing dramatic sunset lighting and raw physical action frames over a two-day period.",
    status: "reviewed"
  }
];

const seedDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/lumiere-studio";
  console.log("Connecting to MongoDB for seeding...");
  
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to database.");

    // Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log(`Seeding ${seedProjects.length} initial projects...`);
      await Project.insertMany(seedProjects);
      console.log("Projects seeded successfully.");
    } else {
      console.log("Project collection already has data. Skipping project seed.");
    }

    // Seed Inquiries
    const inquiryCount = await Inquiry.countDocuments();
    if (inquiryCount === 0) {
      console.log(`Seeding ${seedInquiries.length} initial inquiries...`);
      await Inquiry.insertMany(seedInquiries);
      console.log("Inquiries seeded successfully.");
    } else {
      console.log("Inquiry collection already has data. Skipping inquiry seed.");
    }

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

seedDatabase();