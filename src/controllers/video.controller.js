import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
  // Convert page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Build the filter object
  let filter = {};
  if (query) {
    filter.$text = { $search: query }; // Assuming you have a text index on relevant fields
  }
  if (userId) {
    filter.userId = userId;
  }

  // Build the sort object
  let sort = {};
  sort[sortBy] = sortType === "asc" ? 1 : -1;

  try {
    // Fetch videos from the database
    const videos = await Video.find(filter)
      .sort(sort)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Get the total count of videos matching the filter
    const totalVideos = await Video.countDocuments(filter);

    // Send the response
    res.status(200).json({
      success: true,
      data: videos,
      pagination: {
        total: totalVideos,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalVideos / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});



const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video
  const videoFile = req.file; // Assuming you're using multer to handle file uploads

  if (!videoFile) {
    return res.status(400).json({ message: "No video file uploaded" });
  }

  // Upload video to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(videoFile.path, {
    resource_type: "video",
  });

  // Create video entry in the database
  const newVideo = new Video({
    title,
    description,
    url: uploadResult.secure_url,
    cloudinaryId: uploadResult.public_id,
  });

  await newVideo.save();

  res
    .status(201)
    .json({ message: "Video published successfully", video: newVideo });
});



const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  const { title, description, thumbnail } = req.body;

  // Validate input
  if (!title || !description || !thumbnail) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Fetch and update video
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  video.title = title;
  video.description = description;
  video.thumbnail = thumbnail;

  // Save changes
  await video.save();

  // Send response
  res.status(200).json({ message: "Video updated successfully", video });
});



const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  try {
    // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete the video
    await video.remove();

    // Send a success response
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
  


const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle publish status
  // Fetch the video from the database
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  // Toggle the publish status
  video.isPublished = !video.isPublished;

  // Save the updated video record
  await video.save();

  // Send a response
  res.status(200).json({ message: "Publish status toggled", video });
});
  


export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
