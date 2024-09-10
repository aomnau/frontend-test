import { useEffect, useState } from 'react';
import axios from 'axios';

const Homepage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                
                const response = await axios.get('http://localhost:3000/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to load profile. Please try again later.');
            } finally {
                setLoading(false); 
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Personal Info</h1>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold text-white bg-red-500 rounded-full p-4">R</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="font-semibold text-gray-600">First Name:</p>
                            <p>{user.firstName}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold text-gray-600">Last Name:</p>
                            <p>{user.lastName}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold text-gray-600">Birthday:</p>
                            <p>{user.birthday ? formatDate(user.birthday) : 'N/A'}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold text-gray-600">Gender:</p>
                            <p>{user.gender}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold text-gray-600">Email:</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
