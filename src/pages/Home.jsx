import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/bg.png'; // Adjust the path as needed

const Home = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/signin");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <div
            className="h-screen w-full bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-25"></div>
            <div className="relative z-10 text-center text-white">
                <h1 className="text-5xl font-bold mb-4">CPMS</h1>
                <h3 className="text-2xl mb-4">Construction Project Management System</h3    >
                <p className="text-lg mb-8">Manage your projects, anywhere, anytime.</p>
                <div className="flex flex-col items-center space-y-4 w-1/2 mx-auto">
                    <button
                        onClick={handleSignIn}
                        className="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-blue-500 transition w-full"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={handleSignUp}
                        className="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-blue-500 transition w-full"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
