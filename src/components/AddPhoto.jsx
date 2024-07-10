import React, { useRef, useState } from 'react';
import SecondaryButton from "../components/ui_components/SecondaryButton";
import InputField from "../components/ui_components/InputField";
import supabase from '../supabase';
import moment from 'moment';
import imageCompression from 'browser-image-compression';
import { CircularProgress } from '@mui/joy';
// import locationIcon from '../path/to/locationIcon'; // Adjust this import according to your project structure

const AddPhoto = ({ logId, userId, folderPath, onPhotoAdded, tag }) => {
    const [uploading, setUploading] = useState(false);
    const [compressing, setCompressing] = useState(false);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const fileInputRef = useRef(null);

    const handleAddPhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                setCompressing(true);
                const compressedFile = await compressImage(file);
                setCompressing(false);
                uploadImage(compressedFile);
            } catch (error) {
                setCompressing(false);
                alert('Error compressing image: ' + error.message);
            }
        }
    };

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error('Error compressing image:', error);
            throw error;
        }
    };

    const uploadImage = async (file) => {
        try {
            setUploading(true);
            const filePath = `${folderPath}/${file.name}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data, error } = await supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            if (error) {
                throw error;
            }

            const { error: insertError } = await supabase
                .from('photos')
                .insert([{
                    photo_url: data.publicUrl,
                    log_id: logId,
                    created_on: moment().format(),
                    created_by: userId,
                    caption: caption,
                    tag: tag,
                }]);

            if (insertError) {
                throw insertError;
            }

            setImage(data.publicUrl);
            alert('Image uploaded and URL inserted successfully.');
            if (onPhotoAdded) {
                onPhotoAdded(data.publicUrl);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
            />
            <div className="mt-4">
                {/* <label htmlFor="caption">Caption:</label> */}
                <InputField
                    // icon={locationIcon}
                    placeholder="Description/Caption"
                    handleInputChange={setCaption}
                />
                <SecondaryButton text="Add Photo" onClick={handleAddPhoto} />

            </div>
            {compressing && (
                <div className="flex items-center mt-4">
                    <CircularProgress size="sm" />
                    <p className="ml-2">Compressing image...</p>
                </div>
            )}
            {uploading && (
                <div className="flex items-center mt-4">
                    <CircularProgress size="sm" />
                    <p className="ml-2">Uploading...</p>
                </div>
            )}
            {image && <img src={image} alt="Uploaded" className="max-w-full mt-5 rounded-lg shadow-md" />}
        </div>
    );
};

export default AddPhoto;
