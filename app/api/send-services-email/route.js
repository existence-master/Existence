import { NextResponse } from "next/server"; // Import Next.js server response handling
import nodemailer from "nodemailer"; // Library to send emails
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  const {
    email,
    description,
    available,
    first_name,
    last_name,
    phone,
    company,
  } = await req.json(); // Extract details from the request body

  // Configure Nodemailer with email SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Gmail as the email service
    auth: {
      user: process.env.GMAIL_USER, // Gmail user from environment variables
      pass: process.env.GMAIL_PASS, // Gmail password from environment variables
    },
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  });

  try {
    // Send the email to the user's email
    await transporter.sendMail({
      from: `"Existence Services" <${process.env.GMAIL_USER}>`, // Email sender
      to: email, // Recipient email
      subject: "Thank you for your interest in Existence Services!", // Email subject
      text: `Hello, ${first_name} ${last_name}, \n\nThank you for your interest in Existence's Development Services. \n\nYou have enquired for a project with the following description: ${description}. \n\nYou are available at/on "${available}". We will try to reach out to you as soon as possible. \n\n In the meantime, you can go through this document to view detailed information about our past projects and more. https://docs.google.com/document/d/180NGAJ2bkVp0Mn5CofXUrSjnGXTo2sb6RqY3f8pa6qg/edit?usp=sharing \n\nOther details you submitted are as follows: \nCompany: ${company}, \nPhone: ${phone}.`, // Email content
    });

    return new NextResponse({ status: 200 }); // Return the hash as the response with HTTP status 200
  } catch (error) {
    console.error("Error sending email:", error); // Log the error for debugging
    return new NextResponse(
      JSON.stringify({ error: "Failed to send email" }), // Return error message
      { status: 400 } // HTTP status 400 Bad Request
    );
  }
};
