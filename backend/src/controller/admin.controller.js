import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

//helper function for cloudinary uploads
const uploadCloudinary = async(file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type : auto,
        }
        )

        return result.secure_url;
    }catch(error){
        console.log("Error upload to cloudinary", error);
        throw new Error("Error in uploading cloudinary");
    }
}

export const createSong = async (req, res, next) => {
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return  res.status(400).send({message: "Please upload all files." });
        }
        const {title,artist,albumId,duration} = req.body;
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,
        })

        await song.save();

        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: songs_id },
            })
        }
        res.status(201).json(song)
    } catch (error){
        console.log("Error in creating song", error);
        next(error)
    }
}

export const deleteSong = async (req, res, next) => {
    try{
        const {id} = req.params

        const song = await Song.findById(id);

        //if the song belongs to an album , update the album's song array
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {songs: song._id},
            })
        }
        await Song.findByIdAndDelete(id)
        res.status(200).json({message : "Song deletef successfully."});
    }catch(error){
        console.log("Error in deleting song", error);
        next(error);
    }
}