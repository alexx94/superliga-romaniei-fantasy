import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
    const nameArray = "Welcome to".split("");
    const jobArray = "Football League!".split("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <div className="home-page bg-gradient-to-r from-blue-500 to-indigo-900 min-h-screen flex items-center justify-center text-white">
            <div className="text-zone text-center p-6 rounded-xl bg-black bg-opacity-60">
                <h2 className="text-xl mb-6">Everything SuperLiga related!</h2>
                <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">Get Started</Link>
            </div>
        </div>
    );
};

export default Home