const {user, Job} = require("../models/post");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getNextSequenceValue} = require("../services/counterService");
const multer=require('multer');
const path = require('path');



exports.createUser = async (req, res) => {
    try {
        const userid = await getNextSequenceValue('userid');
        const { email, password, fname, lname, phoneNumber } = req.body;

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with the correct _id field
        const newUser = new user({ _id: userid, email, password: hashedPassword, fname, lname, phoneNumber });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: 'Failed to Login' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: existingUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // // Respond with the token
        res.status(200).json({ token, message: "login sucessfull" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in user' });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const User = await user.findById(req.params.id);
        if (!User) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user: ' + error.message });
    }
};


exports.postJob = async (req, res) => {
    try {
        const jobid = await getNextSequenceValue('jobid');
        const { Title, location, department, salary_range, company_name, description, requirenment, employment, required_experience, required_equcation, industry } = req.body;

        const newJob = new Job({
            _id: jobid,
            Title,
            location,
            department,
            salary_range,
            company_name,
            job_description: description,
            requirement: requirenment,
            job_type: employment,
            required_experience,
            required_education: required_equcation,
            industry,
            posted_at: new Date()
        });

        await newJob.save();

        res.status(201).json({ message: 'Job posted successfully', job: newJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.searchJob = async (req, res) => {
    try {
        const { title, location, salary_range } = req.query;  // Use req.query instead of req.body for GET requests

        // Check if all search parameters are missing
        if (!title && !location && !salary_range) {
            return res.status(400).json({ error: 'At least one search parameter must be provided' });
        }

        const query = {};

        if (title) {
            query.Title = { $regex: new RegExp(title, 'i') };
        }
        if (location) {
            query.location = { $regex: new RegExp(location, 'i') };
        }
        if (salary_range) {
            query.salary_range = { $regex: new RegExp(salary_range, 'i') };
        }

        const jobs = await Job.find(query);
        
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the job by ID and update it with the new data
        const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.postallJobs = async (req, res) => {
    try {
        const jobsData = req.body; // Assuming req.body is an array of job objects

        const jobsToInsert = jobsData.map(async (jobData) => {
            const jobid = await getNextSequenceValue('jobid'); // Generate job ID for each job

            const newJob = new Job({
                _id: jobid,
                Title: jobData.Title,
                location: jobData.location,
                department: jobData.department,
                salary_range: jobData.salary_range,
                company_name: jobData.company_name,
                job_description: jobData.job_description,
                requirement: jobData.requirement,
                job_type: jobData.job_type,
                required_experience: jobData.required_experience,
                required_education: jobData.required_education,
                industry: jobData.industry,
                posted_at: new Date()
            });

            await newJob.save(); // Save each job asynchronously
            return newJob;
        });

        const insertedJobs = await Promise.all(jobsToInsert); // Wait for all jobs to be saved

        res.status(201).json({ message: 'Jobs posted successfully', jobs: insertedJobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

