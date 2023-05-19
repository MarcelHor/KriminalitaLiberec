import React from 'react';

export const NoPage = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl">404</h1>
            <h2 className="text-xl">Stránka, kterou hledáte neexistuje.</h2>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded">
                <a href="/">Zpět na hlavní stránku</a>
            </button>
        </div>
    );
}