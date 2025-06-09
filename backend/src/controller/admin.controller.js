import {Song} from "../models/song.model.js";

export const createSong = async (req, res) => {
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return  res.status(400).send({message: "Please upload all files." });
        }
        const {title,artist,albumId,duration} = req.body;
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile
        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,

        })
    } catch (error){

    }
}