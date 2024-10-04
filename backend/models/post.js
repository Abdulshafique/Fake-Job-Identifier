const mongoose = require("mongoose");


const User = new mongoose.Schema({
    _id: Number,
    email: { type: String, required: true},
    password: { type: String, required: true},
    fname: String,
    lname: String,
    phoneNumber: String,
});

const jobSchema = new mongoose.Schema({
    _id: Number,
    Title: String,
    location: String,
    department: String,
    salary_range: String,
    company_name: String,
    job_description: String,
    requirement: String,
    job_type: String,
    required_experience: String,
    required_education: String,
    industry: String,
    posted_at: Date
});

jobSchema.index({ Title: 'text', location: 'text', salary_range: 'text' });

const counterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: {
        type: Number,
        default: 0
    }
});





//module.exports = mongoose.model("post", postSchema);

module.exports = {
    user: mongoose.model("user", User),
    Counter: mongoose.model("Counter", counterSchema),
    Job: mongoose.model("Job", jobSchema)
};